import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, SiteConfig } from "@/lib/data";

async function getApiKey(): Promise<string> {
  try {
    const config = await readJsonFile<SiteConfig>("config.json");
    if (config.googlePlacesApiKey) return config.googlePlacesApiKey;
  } catch { /* fall through */ }
  return process.env.GOOGLE_PLACES_API_KEY ?? "";
}

// Google Place IDs for ABC Cleaners locations
const PLACE_CONFIG: Record<
  string,
  { placeId: string; searchQuery: string; name: string }
> = {
  biltmore: {
    placeId: "",
    searchQuery: "ABC Cleaners Dry Cleaning Laundry 3023 N 24th St Phoenix AZ",
    name: "ABC Cleaners @ Biltmore",
  },
  "north-phoenix": {
    placeId: "",
    searchQuery: "Norterra Cleaners 1930 W Pinnacle Peak Rd Phoenix AZ",
    name: "ABC Cleaners @ North Phoenix",
  },
};

const FETCH_INTERVAL = 60 * 60 * 1000; // 1 hour between Google API fetches

interface CachedReview {
  author: string;
  authorUrl: string;
  authorPhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
  _key: string;
  _firstSeen: string;
  _approxTimestamp: number; // approximate epoch ms derived from relativeTime
}

/** Convert relative time strings like "2 weeks ago", "a month ago" into approximate epoch ms. */
function parseRelativeTime(rel: string): number {
  const now = Date.now();
  if (!rel) return now;
  const lower = rel.toLowerCase().trim();

  // Match patterns like "2 weeks ago", "a month ago", "an hour ago"
  const match = lower.match(/^(\d+|a|an)\s+(second|minute|hour|day|week|month|year)s?\s+ago$/);
  if (!match) return now;

  const rawNum = match[1];
  const num = (rawNum === "a" || rawNum === "an") ? 1 : parseInt(rawNum, 10);
  const unit = match[2];

  const ms: Record<string, number> = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  };

  return now - num * (ms[unit] ?? 0);
}

interface CachedLocation {
  locationName: string;
  rating: number;
  totalReviews: number;
  reviews: CachedReview[];
  lastFetched: number; // epoch ms
}

interface ReviewsCache {
  biltmore: CachedLocation | null;
  "north-phoenix": CachedLocation | null;
}

// Pure in-memory cache (resets on cold start — acceptable for serverless)
let memoryCache: ReviewsCache = { biltmore: null, "north-phoenix": null };

function reviewKey(author: string, text: string): string {
  return `${author}::${(text || "").slice(0, 100)}`;
}

/** Merge new reviews into existing cached reviews. New unique reviews are added; existing ones are kept. */
function mergeReviews(
  existing: CachedReview[],
  incoming: CachedReview[]
): CachedReview[] {
  const seen = new Map<string, CachedReview>();
  // Existing reviews first (preserves _firstSeen)
  for (const r of existing) {
    seen.set(r._key, r);
  }
  // Incoming reviews — only add if not already present
  for (const r of incoming) {
    if (!seen.has(r._key)) {
      seen.set(r._key, r);
    }
  }
  // Sort by approximate publish time descending (newest reviews first)
  return Array.from(seen.values()).sort(
    (a, b) => b._approxTimestamp - a._approxTimestamp
  );
}

interface GoogleReview {
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  originalText?: { text?: string };
}

// In-memory place ID cache (survives within a single server process)
const placeIdCache = new Map<string, string>();

async function findPlaceId(
  searchQuery: string,
  apiKey: string
): Promise<string | null> {
  const cached = placeIdCache.get(searchQuery);
  if (cached) return cached;

  const url = `https://places.googleapis.com/v1/places:searchText`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: searchQuery }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  const placeId = data.places?.[0]?.id;
  if (placeId) {
    placeIdCache.set(searchQuery, placeId);
  }
  return placeId || null;
}

async function fetchFromGoogle(
  placeId: string,
  apiKey: string,
  locationName: string
): Promise<{ rating: number; totalReviews: number; reviews: CachedReview[] }> {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
    },
  });

  if (!res.ok) {
    throw new Error(`Google Places API error: ${res.status}`);
  }

  const data = await res.json();
  const now = new Date().toISOString();

  return {
    rating: data.rating ?? 0,
    totalReviews: data.userRatingCount ?? 0,
    reviews: (data.reviews ?? []).map((r: GoogleReview) => {
      const author = r.authorAttribution?.displayName ?? "Anonymous";
      const text = r.text?.text ?? r.originalText?.text ?? "";
      const relativeTime = r.relativePublishTimeDescription ?? "";
      return {
        author,
        authorUrl: r.authorAttribution?.uri ?? "",
        authorPhoto: r.authorAttribution?.photoUri ?? "",
        rating: r.rating ?? 5,
        text,
        relativeTime,
        _key: reviewKey(author, text),
        _firstSeen: now,
        _approxTimestamp: parseRelativeTime(relativeTime),
      };
    }),
  };
}

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location") as
    | "biltmore"
    | "north-phoenix"
    | null;

  if (!location || !PLACE_CONFIG[location]) {
    return NextResponse.json(
      { error: "Invalid location. Use 'biltmore' or 'north-phoenix'." },
      { status: 400 }
    );
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured. Set it in Admin → Settings." },
      { status: 503 }
    );
  }

  const config = PLACE_CONFIG[location];

  try {
    // Resolve place ID
    let placeId = config.placeId;
    if (!placeId) {
      placeId = (await findPlaceId(config.searchQuery, apiKey)) ?? "";
      if (!placeId) {
        return NextResponse.json(
          { error: "Could not find Google Place for this location." },
          { status: 404 }
        );
      }
      config.placeId = placeId;
    }

    // Check in-memory cache
    const cachedLocation = memoryCache[location];

    // If cache is fresh enough, return it directly
    if (
      cachedLocation &&
      cachedLocation.reviews.length > 0 &&
      Date.now() - cachedLocation.lastFetched < FETCH_INTERVAL
    ) {
      return NextResponse.json(
        {
          locationName: cachedLocation.locationName,
          rating: cachedLocation.rating,
          totalReviews: cachedLocation.totalReviews,
          reviews: cachedLocation.reviews,
        },
        { headers: { "X-Cache": "HIT" } }
      );
    }

    // Fetch fresh reviews from Google
    const fresh = await fetchFromGoogle(placeId, apiKey, config.name);

    // Merge with existing cached reviews (accumulates within this process)
    const existingReviews = cachedLocation?.reviews ?? [];
    const merged = mergeReviews(existingReviews, fresh.reviews);

    // Update in-memory cache
    memoryCache[location] = {
      locationName: config.name,
      rating: fresh.rating,
      totalReviews: fresh.totalReviews,
      reviews: merged,
      lastFetched: Date.now(),
    };

    return NextResponse.json(
      {
        locationName: config.name,
        rating: fresh.rating,
        totalReviews: fresh.totalReviews,
        reviews: merged,
      },
      { headers: { "X-Cache": "MISS" } }
    );
  } catch (err) {
    // If fetch fails but we have in-memory cached data, return stale
    const stale = memoryCache[location];
    if (stale && stale.reviews.length > 0) {
      return NextResponse.json(
        {
          locationName: stale.locationName,
          rating: stale.rating,
          totalReviews: stale.totalReviews,
          reviews: stale.reviews,
        },
        { headers: { "X-Cache": "STALE" } }
      );
    }

    console.error("Reviews API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}
