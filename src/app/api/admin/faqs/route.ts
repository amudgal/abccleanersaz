import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { readJsonFile, writeJsonFile, FaqsData } from "@/lib/data";

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
    const data = await readJsonFile<FaqsData>("faqs.json");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read FAQ data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (typeof body.visible !== "boolean" || !Array.isArray(body.faqs)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    for (const faq of body.faqs) {
      if (!faq.id || typeof faq.question !== "string" || typeof faq.answer !== "string" || typeof faq.visible !== "boolean") {
        return NextResponse.json({ error: "Invalid FAQ format" }, { status: 400 });
      }
    }

    const data: FaqsData = {
      visible: body.visible,
      faqs: body.faqs,
    };

    await writeJsonFile("faqs.json", data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save FAQ data" }, { status: 500 });
  }
}
