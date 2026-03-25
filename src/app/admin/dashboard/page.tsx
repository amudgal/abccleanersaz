"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, DollarSign, HelpCircle, BarChart3, FileText, Users, Settings, Home } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
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
              <h1 className="font-bold text-lg text-gray-900">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">ABC Cleaners</p>
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, Admin
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your ABC Cleaners business from here.
          </p>
        </div>

        {/* Content Management */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Content Management</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Link href="/admin/dashboard/pricing">
            <Card className="hover:shadow-lg hover:border-[#2b7fb5] transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">Manage Pricing</h3>
                <p className="text-sm text-gray-500 mt-1">Edit prices, add categories, show/hide pricing page</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/dashboard/faqs">
            <Card className="hover:shadow-lg hover:border-[#2b7fb5] transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">Manage FAQs</h3>
                <p className="text-sm text-gray-500 mt-1">Edit questions & answers, show/hide individual FAQs</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/dashboard/settings">
            <Card className="hover:shadow-lg hover:border-[#2b7fb5] transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">Settings</h3>
                <p className="text-sm text-gray-500 mt-1">Configure API keys and site settings</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Other sections */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Coming Soon</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <BarChart3 className="w-6 h-6" />, label: "Analytics", color: "bg-purple-50 text-purple-600" },
            { icon: <FileText className="w-6 h-6" />, label: "Orders", color: "bg-orange-50 text-orange-600" },
            { icon: <Users className="w-6 h-6" />, label: "Customers", color: "bg-pink-50 text-pink-600" },
          ].map((item) => (
            <Card key={item.label} className="opacity-60">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-400 mt-1">Coming soon</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
