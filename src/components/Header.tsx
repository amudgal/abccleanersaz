"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, LogIn, Leaf } from "lucide-react";

const allNavLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/pricing", label: "Pricing" },
  { path: "/for-business", label: "For Business" },
  { path: "/locations", label: "Locations" },
  { path: "/reviews", label: "Reviews" },
  { path: "/faq", label: "FAQ" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingVisible, setPricingVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/pricing/status")
      .then((res) => res.json())
      .then((data) => setPricingVisible(data.visible))
      .catch(() => setPricingVisible(true));
  }, []);

  const navLinks = pricingVisible
    ? allNavLinks
    : allNavLinks.filter((link) => link.path !== "/pricing");

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+16029565271" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="sm:hidden text-xs">North Phoenix</span>
              <span className="hidden sm:inline">North Phoenix: (602) 956-5271</span>
            </a>
            <a href="tel:+16232231460" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="sm:hidden text-xs">Biltmore</span>
              <span className="hidden sm:inline">Biltmore: (623) 223-1460</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-green-300" />
              <span>Eco-Friendly Practices</span>
            </div>
            <span className="text-blue-200">|</span>
            <span>Trusted for 40 Years</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/ABC@Main.png" alt="ABC Cleaners - Dry Cleaning & Laundry" width={240} height={80} className="h-12 md:h-16 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors text-sm ${
                  isActive(link.path) ? "text-[#1e4a7a] font-semibold" : "text-gray-600 hover:text-[#2b7fb5]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pickup-delivery"
              className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all text-sm"
            >
              Pickup & Delivery
            </Link>
            <Link href="/admin/login" className="flex items-center gap-2 text-gray-600 hover:text-[#2b7fb5] transition-colors text-sm">
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors ${isActive(link.path) ? "text-[#1e4a7a] font-semibold" : "text-gray-600 hover:text-[#2b7fb5]"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/pickup-delivery"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white px-6 py-2 rounded-full text-center hover:shadow-lg transition-all"
              >
                Pickup & Delivery
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#2b7fb5] transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
