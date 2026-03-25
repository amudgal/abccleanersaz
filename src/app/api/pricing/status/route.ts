import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await readJsonFile<{ visible: boolean }>("pricing.json");
    return NextResponse.json({ visible: data.visible });
  } catch {
    return NextResponse.json({ visible: true });
  }
}
