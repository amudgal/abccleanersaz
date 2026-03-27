"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Home,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface PriceItem {
  item: string;
  price: string;
}

interface PriceCategory {
  id: string;
  title: string;
  highlight: boolean;
  items: PriceItem[];
}

interface PricingData {
  visible: boolean;
  categories: PriceCategory[];
  pickupDeliveryNote?: string;
}

export default function AdminPricingPage() {
  const router = useRouter();
  const [data, setData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/pricing");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
    } catch {
      setMessage({ type: "error", text: "Failed to load pricing data" });
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
      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      setMessage({ type: "success", text: "Pricing saved successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  function updateItem(catIndex: number, itemIndex: number, field: "item" | "price", value: string) {
    if (!data) return;
    const updated = { ...data };
    updated.categories = [...updated.categories];
    updated.categories[catIndex] = { ...updated.categories[catIndex] };
    updated.categories[catIndex].items = [...updated.categories[catIndex].items];
    updated.categories[catIndex].items[itemIndex] = {
      ...updated.categories[catIndex].items[itemIndex],
      [field]: value,
    };
    setData(updated);
  }

  function addItem(catIndex: number) {
    if (!data) return;
    const updated = { ...data };
    updated.categories = [...updated.categories];
    updated.categories[catIndex] = { ...updated.categories[catIndex] };
    updated.categories[catIndex].items = [
      ...updated.categories[catIndex].items,
      { item: "", price: "" },
    ];
    setData(updated);
  }

  function removeItem(catIndex: number, itemIndex: number) {
    if (!data) return;
    const updated = { ...data };
    updated.categories = [...updated.categories];
    updated.categories[catIndex] = { ...updated.categories[catIndex] };
    updated.categories[catIndex].items = updated.categories[catIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setData(updated);
  }

  function updateCategoryTitle(catIndex: number, title: string) {
    if (!data) return;
    const updated = { ...data };
    updated.categories = [...updated.categories];
    updated.categories[catIndex] = { ...updated.categories[catIndex], title };
    setData(updated);
  }

  function moveCategory(fromIndex: number, direction: "up" | "down") {
    if (!data) return;
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= data.categories.length) return;
    const updated = { ...data };
    const cats = [...updated.categories];
    [cats[fromIndex], cats[toIndex]] = [cats[toIndex], cats[fromIndex]];
    updated.categories = cats;
    setData(updated);
  }

  function addCategory() {
    if (!data) return;
    setData({
      ...data,
      categories: [
        ...data.categories,
        {
          id: `cat-${Date.now()}`,
          title: "New Category",
          highlight: false,
          items: [{ item: "", price: "" }],
        },
      ],
    });
  }

  function removeCategory(catIndex: number) {
    if (!data) return;
    setData({
      ...data,
      categories: data.categories.filter((_, i) => i !== catIndex),
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
              <h1 className="font-bold text-lg text-gray-900">Manage Pricing</h1>
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

      <main className="max-w-5xl mx-auto px-4 py-8">
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
            <span className="font-semibold text-gray-700">Pricing Page</span>
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
            <Button onClick={addCategory} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {data?.categories.map((cat, catIndex) => (
            <Card key={cat.id} className="shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col">
                      <button
                        onClick={() => moveCategory(catIndex, "up")}
                        disabled={catIndex === 0}
                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveCategory(catIndex, "down")}
                        disabled={catIndex === (data?.categories.length ?? 0) - 1}
                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <Input
                      value={cat.title}
                      onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                      placeholder="Category name"
                      className="text-lg font-semibold border border-dashed border-gray-300 hover:border-[#2b7fb5] focus:border-solid focus:border-[#2b7fb5] px-2 rounded"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const updated = { ...data! };
                        updated.categories = [...updated.categories];
                        updated.categories[catIndex] = {
                          ...updated.categories[catIndex],
                          highlight: !cat.highlight,
                        };
                        setData(updated);
                      }}
                      className={`text-xs px-2 py-1 rounded ${cat.highlight ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {cat.highlight ? "★ Highlighted" : "☆ Normal"}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCategory(catIndex)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Header row */}
                  <div className="grid grid-cols-[1fr_150px_40px] gap-2 px-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                    <span>Item</span>
                    <span>Price</span>
                    <span></span>
                  </div>
                  {cat.items.map((priceItem, itemIndex) => (
                    <div key={itemIndex} className="grid grid-cols-[1fr_150px_40px] gap-2 items-center">
                      <Input
                        value={priceItem.item}
                        onChange={(e) => updateItem(catIndex, itemIndex, "item", e.target.value)}
                        placeholder="Item name"
                        className="text-sm"
                      />
                      <Input
                        value={priceItem.price}
                        onChange={(e) => updateItem(catIndex, itemIndex, "price", e.target.value)}
                        placeholder="$0.00"
                        className="text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(catIndex, itemIndex)}
                        className="text-gray-400 hover:text-red-600 h-9 w-9 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addItem(catIndex)} className="text-[#2b7fb5] mt-2">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pickup & Delivery Note */}
        <Card className="shadow-md mt-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Pickup & Delivery Note</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={data?.pickupDeliveryNote ?? ""}
              onChange={(e) => data && setData({ ...data, pickupDeliveryNote: e.target.value })}
              placeholder="e.g. $5.99 delivery fee for orders under $30"
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">Shown on the public pricing page under the Pickup & Delivery card. Leave blank to hide.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
