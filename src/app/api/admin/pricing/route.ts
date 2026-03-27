import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { readJsonFile, writeJsonFile, PricingData } from "@/lib/data";

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

export async function GET() {
  try {
    const data = await readJsonFile<PricingData>("pricing.json");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read pricing data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validate structure
    if (typeof body.visible !== "boolean" || !Array.isArray(body.categories)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    for (const cat of body.categories) {
      if (!cat.id || !cat.title || !Array.isArray(cat.items)) {
        return NextResponse.json({ error: "Invalid category format" }, { status: 400 });
      }
      for (const item of cat.items) {
        if (typeof item.item !== "string" || typeof item.price !== "string") {
          return NextResponse.json({ error: "Invalid price item format" }, { status: 400 });
        }
      }
    }

    const data: PricingData = {
      visible: body.visible,
      categories: body.categories,
    };

    await writeJsonFile("pricing.json", data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save pricing data" }, { status: 500 });
  }
}
