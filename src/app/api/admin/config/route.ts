import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { readJsonFile, writeJsonFile, SiteConfig } from "@/lib/data";

export const dynamic = "force-dynamic";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-me-in-production"
);

async function verifyAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin-token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await readJsonFile<SiteConfig>("config.json");
    // Mask the API key for display (show first 10 + last 4 chars)
    const key = data.googlePlacesApiKey || "";
    const masked = key.length > 14
      ? key.slice(0, 10) + "..." + key.slice(-4)
      : key;
    return NextResponse.json({ ...data, googlePlacesApiKeyMasked: masked });
  } catch {
    return NextResponse.json({ googlePlacesApiKey: "", googlePlacesApiKeyMasked: "" });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (typeof body.googlePlacesApiKey !== "string") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const data: SiteConfig = {
      googlePlacesApiKey: body.googlePlacesApiKey.trim(),
    };

    await writeJsonFile("config.json", data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 });
  }
}
