import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { compare } from "bcryptjs";
import { getItem } from "@/lib/dynamodb";

interface AdminUser {
  email: string;
  passwordHash: string;
  role: string;
}

async function getAdminUser(email: string): Promise<AdminUser | null> {
  try {
    const user = await getItem<AdminUser>(`ADMIN_USER#${email.toLowerCase()}`);
    return user;
  } catch (err) {
    console.error("Could not read admin user from DynamoDB:", err);
    return null;
  }
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

    const adminUser = await getAdminUser(email);
    const jwtSecret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "change-me-in-production"
    );

    if (!adminUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch = await compare(password, adminUser.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ email: adminUser.email, role: adminUser.role })
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
