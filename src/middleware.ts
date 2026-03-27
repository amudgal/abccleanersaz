import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "change-me-in-production"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If already logged in, redirect away from login page to dashboard
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin-token")?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        // Token invalid — let them see login page
      }
    }
    return NextResponse.next();
  }

  // Protect /admin/dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      // Invalid or expired token — redirect to login
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.set("admin-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/login"],
};
