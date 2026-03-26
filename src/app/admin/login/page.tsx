"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Mail, AlertCircle, Loader2, ShieldCheck, MapPin, ArrowLeft, ExternalLink } from "lucide-react";

type LoginChoice = null | "admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [choice, setChoice] = useState<LoginChoice>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e4a7a] via-[#2b7fb5] to-[#3ba3d4] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Image
              src="/images/ABC@Main.png"
              alt="ABC Cleaners"
              width={200}
              height={64}
              className="mx-auto mb-4 h-14 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              {choice === "admin" ? "Admin Login" : "Login"}
            </h1>
            <p className="text-gray-500 mt-1">ABC Cleaners</p>
          </div>

          {/* ─── Portal Selection ─── */}
          {choice === null && (
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-500 mb-4">
                Choose your location to sign in
              </p>

              <a
                href="https://norterracleaners.smrtapp.com/custx/login"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  className="w-full h-auto py-4 bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] hover:from-[#163a62] hover:to-[#236a9b] text-white"
                >
                  <div className="flex items-center gap-3 w-full">
                    <MapPin className="w-6 h-6 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-semibold">
                        ABC Cleaners @ North Phoenix
                      </div>
                      <div className="text-xs text-blue-200 font-normal">
                        Customer portal — Norterra / Pinnacle Peak
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  </div>
                </Button>
              </a>

              <a
                href="https://azbestdrycleaning.smrtapp.com/custx/login"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  className="w-full h-auto py-4 bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] hover:from-[#163a62] hover:to-[#236a9b] text-white"
                >
                  <div className="flex items-center gap-3 w-full">
                    <MapPin className="w-6 h-6 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-semibold">
                        ABC Cleaners @ Biltmore
                      </div>
                      <div className="text-xs text-blue-200 font-normal">
                        Customer portal — Biltmore / 24th Street
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-blue-200 flex-shrink-0" />
                  </div>
                </Button>
              </a>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setChoice("admin")}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Login
                </button>
              </div>
            </div>
          )}

          {/* ─── Admin Login Form ─── */}
          {choice === "admin" && (
            <>
              <button
                onClick={() => {
                  setChoice(null);
                  setError("");
                }}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login options
              </button>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@abccleaners.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] hover:from-[#163a62] hover:to-[#236a9b] text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
