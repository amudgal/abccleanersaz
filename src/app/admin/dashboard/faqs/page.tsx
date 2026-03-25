"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  LogOut,
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  GripVertical,
  Home,
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
}

interface FaqsData {
  visible: boolean;
  faqs: FaqItem[];
}

export default function AdminFaqsPage() {
  const router = useRouter();
  const [data, setData] = useState<FaqsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      setMessage({ type: "error", text: "Failed to load FAQ data" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      setMessage({ type: "success", text: "FAQs saved successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    if (!data) return;
    const updated = { ...data };
    updated.faqs = [...updated.faqs];
    updated.faqs[index] = { ...updated.faqs[index], [field]: value };
    setData(updated);
  }

  function toggleFaqVisibility(index: number) {
    if (!data) return;
    const updated = { ...data };
    updated.faqs = [...updated.faqs];
    updated.faqs[index] = { ...updated.faqs[index], visible: !updated.faqs[index].visible };
    setData(updated);
  }

  function addFaq() {
    if (!data) return;
    setData({
      ...data,
      faqs: [
        ...data.faqs,
        { id: `faq-${Date.now()}`, question: "", answer: "", visible: true },
      ],
    });
  }

  function removeFaq(index: number) {
    if (!data) return;
    setData({
      ...data,
      faqs: data.faqs.filter((_, i) => i !== index),
    });
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/ABC@Main.png" alt="ABC Cleaners" width={120} height={40} className="h-8 w-auto" />
            <div>
              <h1 className="font-bold text-lg text-gray-900">Manage FAQs</h1>
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
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status message */}
        {message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg mb-6 text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        {/* Global visibility + save */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">FAQ Page</span>
            <button
              onClick={() => data && setData({ ...data, visible: !data.visible })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                data?.visible
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {data?.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {data?.visible ? "Visible on Site" : "Hidden from Site"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={addFaq} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {data?.faqs.map((faq, index) => (
            <Card key={faq.id} className={`shadow-sm transition-opacity ${!faq.visible ? "opacity-60" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <GripVertical className="w-5 h-5 text-gray-300 mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFaq(index, "question", e.target.value)}
                      placeholder="Question..."
                      className="font-semibold text-base"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(index, "answer", e.target.value)}
                      placeholder="Answer..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2b7fb5] focus:border-transparent resize-y"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleFaqVisibility(index)}
                      className={`p-2 rounded-lg transition-colors ${
                        faq.visible
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-red-50 text-red-500 hover:bg-red-100"
                      }`}
                      title={faq.visible ? "Visible — click to hide" : "Hidden — click to show"}
                    >
                      {faq.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFaq(index)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data?.faqs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-4">No FAQs yet</p>
            <Button onClick={addFaq} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First FAQ
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
