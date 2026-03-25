"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, MapPin, Loader2, RefreshCw, ExternalLink, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Review {
  author: string;
  authorUrl: string;
  authorPhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
}

interface LocationReviews {
  locationName: string;
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

// Google review URLs for "Read more on Google" links
const GOOGLE_REVIEW_URLS = {
  biltmore:
    "https://www.google.com/search?kgmid=/g/1thmlg3v&hl=en-US&q=ABC+Cleaners+/+Dry+cleaning+.+Laundry&shndl=30&shem=dacl,lcuae,shrtsdl&source=sh/x/loc/osrp/m5/1",
  "north-phoenix":
    "https://www.google.com/search?kgmid=/g/1t_tkrxg&hl=en-US&q=Norterra+Cleaners&shndl=30&shem=dacl,lcuae,shrtsdl&source=sh/x/loc/osrp/m5/1",
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {review.authorPhoto ? (
              <img
                src={review.authorPhoto}
                alt={review.author}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] flex items-center justify-center text-white font-semibold">
                {review.author.charAt(0)}
              </div>
            )}
            <div>
              {review.authorUrl ? (
                <a
                  href={review.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lg hover:text-[#2b7fb5] transition-colors"
                >
                  {review.author}
                </a>
              ) : (
                <p className="font-semibold text-lg">{review.author}</p>
              )}
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                {review.relativeTime}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        {review.text && (
          <p className="text-gray-700 leading-relaxed">{review.text}</p>
        )}
      </CardContent>
    </Card>
  );
}

function LocationSummary({
  data,
  locationKey,
}: {
  data: LocationReviews | null;
  locationKey: "biltmore" | "north-phoenix";
}) {
  const displayName =
    locationKey === "north-phoenix"
      ? "ABC CLEANERS @ NORTH PHOENIX"
      : "ABC CLEANERS @ BILTMORE";
  const rating = data?.rating ?? 0;
  const total = data?.totalReviews ?? 0;

  return (
    <div className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white rounded-lg p-8 text-center space-y-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className="w-5 h-5" />
        <h3 className="text-xl font-semibold">{displayName}</h3>
      </div>
      <div className="text-5xl font-bold">{rating > 0 ? rating.toFixed(1) : "—"}</div>
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${
              i < Math.round(rating)
                ? "fill-yellow-300 text-yellow-300"
                : "text-white/30"
            }`}
          />
        ))}
      </div>
      <p className="text-blue-100">
        {total > 0 ? `Based on ${total} Google reviews` : "Loading reviews..."}
      </p>
      <a
        href={GOOGLE_REVIEW_URLS[locationKey]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white transition-colors"
      >
        View on Google <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

export default function GoogleReviews() {
  const [northPhoenix, setNorthPhoenix] = useState<LocationReviews | null>(null);
  const [biltmore, setBiltmore] = useState<LocationReviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [npRes, bmRes] = await Promise.all([
        fetch("/api/reviews?location=north-phoenix"),
        fetch("/api/reviews?location=biltmore"),
      ]);

      if (!npRes.ok || !bmRes.ok) {
        const errData = await (npRes.ok ? bmRes : npRes).json();
        setError(errData.error || "Failed to load reviews");
        return;
      }

      const [npData, bmData] = await Promise.all([npRes.json(), bmRes.json()]);
      setNorthPhoenix(npData);
      setBiltmore(bmData);
    } catch {
      setError("Unable to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Customer Reviews</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real-time Google reviews from our customers at both Phoenix
            locations.
          </p>
        </div>
      </section>

      {/* Rating Summary Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <LocationSummary data={northPhoenix} locationKey="north-phoenix" />
          <LocationSummary data={biltmore} locationKey="biltmore" />
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Loading Google reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">{error}</p>
            <p className="text-sm text-gray-400 mb-6">
              Make sure <code className="bg-gray-100 px-2 py-1 rounded">GOOGLE_PLACES_API_KEY</code> is set in your environment variables.
            </p>
            <Button onClick={fetchReviews} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="north-phoenix" className="w-full">
            <div className="flex items-center justify-between mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="north-phoenix" className="text-base">
                  North Phoenix
                </TabsTrigger>
                <TabsTrigger value="biltmore" className="text-base">
                  Biltmore
                </TabsTrigger>
              </TabsList>
              <Button
                onClick={fetchReviews}
                variant="outline"
                size="sm"
                className="ml-4 hidden md:flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {(
              [
                {
                  key: "north-phoenix",
                  data: northPhoenix,
                  label: "North Phoenix",
                },
                { key: "biltmore", data: biltmore, label: "Biltmore" },
              ] as const
            ).map(({ key, data, label }) => (
              <TabsContent key={key} value={key}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">{label} Reviews</h2>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5]">
                      {data?.totalReviews ?? 0} Total Reviews
                    </Badge>
                    <a
                      href={GOOGLE_REVIEW_URLS[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        All reviews on Google{" "}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Badge>
                    </a>
                  </div>
                </div>
                {data?.reviews && data.reviews.length > 0 ? (
                  <div className="grid gap-6">
                    {data.reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No reviews available.
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </section>
    </div>
  );
}
