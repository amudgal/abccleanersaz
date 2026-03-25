import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { compare } from "bcryptjs";

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

    // Read env vars at request time for serverless compatibility
    const adminEmail = process.env.ADMIN_EMAIL ?? "";
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH ?? "";
    const jwtSecret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "change-me-in-production"
    );

    if (!adminEmail || !adminPasswordHash) {
      console.error(
        "Login config missing — ADMIN_EMAIL set:",
        !!adminEmail,
        "ADMIN_PASSWORD_HASH set:",
        !!adminPasswordHash,
        "hash starts with $2:",
        adminPasswordHash.startsWith("$2")
      );
      return NextResponse.json(
        { error: "Server authentication not configured" },
        { status: 503 }
      );
    }

    // Constant-time-ish check: always compare both fields
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
