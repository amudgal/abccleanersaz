import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { compare } from "bcryptjs";
import { readJsonFile, SiteConfig } from "@/lib/data";

async function getAdminCredentials(): Promise<{ email: string; hash: string }> {
  // Try config file first (reliable — no env var $ issues)
  try {
    const config = await readJsonFile<SiteConfig>("config.json");
    if (config.adminEmail && config.adminPasswordHash) {
      return { email: config.adminEmail, hash: config.adminPasswordHash };
    }
  } catch { /* fall through to env vars */ }
  // Fallback to env vars
  return {
    email: process.env.ADMIN_EMAIL ?? "",
    hash: process.env.ADMIN_PASSWORD_HASH ?? "",
  };
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { email: adminEmail, hash: adminPasswordHash } = await getAdminCredentials();
    const jwtSecret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "change-me-in-production"
    );

    if (!adminEmail || !adminPasswordHash) {
      console.error("Login config missing — check data/config.json or env vars");
      return NextResponse.json(
        { error: "Server authentication not configured" },
        { status: 503 }
      );
    }

    const emailMatch = email.toLowerCase() === adminEmail.toLowerCase();
    const passwordMatch = await compare(password, adminPasswordHash);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ email: adminEmail, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(jwtSecret);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
