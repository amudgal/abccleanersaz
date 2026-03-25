"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, ArrowLeft, Home, Save, Eye, EyeOff, Key } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [maskedKey, setMaskedKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => {
        setApiKey(data.googlePlacesApiKey || "");
        setMaskedKey(data.googlePlacesApiKeyMasked || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googlePlacesApiKey: apiKey }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "API key saved successfully. Reviews will use this key on next fetch." });
        // Update masked display
        const key = apiKey;
        setMaskedKey(
          key.length > 14 ? key.slice(0, 10) + "..." + key.slice(-4) : key
        );
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/ABC@Main.png"
              alt="ABC Cleaners"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <div>
              <h1 className="font-bold text-lg text-gray-900">Settings</h1>
              <p className="text-xs text-gray-500">ABC Cleaners Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-600" />
              Google Places API Key
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Required for fetching Google Reviews. Get a key from the{" "}
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Google Cloud Console
              </a>
              . Enable the <strong>Places API (New)</strong>.
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-gray-400">Loading...</div>
            ) : (
              <div className="space-y-4">
                {maskedKey && !showKey && (
                  <div className="text-sm text-gray-500">
                    Current key: <code className="bg-gray-100 px-2 py-1 rounded">{maskedKey}</code>
                  </div>
                )}

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button onClick={handleSave} disabled={saving} className="bg-[#1e4a7a] hover:bg-[#163a62]">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </div>

                {message && (
                  <div
                    className={`text-sm px-3 py-2 rounded ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  The key is stored securely on the server. If no key is saved here, the system falls back to the environment variable.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
