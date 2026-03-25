"use client";

import { useState } from "react";
import { User, Mail, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PickupForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
        <p className="text-gray-600">We&apos;ll contact you shortly to confirm your pickup/delivery schedule.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#2b7fb5]" />Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="firstName">First Name *</Label><Input id="firstName" name="firstName" required placeholder="John" /></div>
          <div className="space-y-2"><Label htmlFor="lastName">Last Name *</Label><Input id="lastName" name="lastName" required placeholder="Doe" /></div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#2b7fb5]" />Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required placeholder="john.doe@example.com" /></div>
          <div className="space-y-2"><Label htmlFor="phone">Phone Number *</Label><Input id="phone" name="phone" type="tel" required placeholder="(602) 555-0123" /></div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-[#2b7fb5]" />Service Address
        </h3>
        <div className="space-y-4">
          <div className="space-y-2"><Label htmlFor="address">Street Address *</Label><Input id="address" name="address" required placeholder="123 Main Street, Apt 4B" /></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="city">City *</Label><Input id="city" name="city" required placeholder="Phoenix" /></div>
            <div className="space-y-2"><Label htmlFor="zipCode">ZIP Code *</Label><Input id="zipCode" name="zipCode" required placeholder="85016" /></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#2b7fb5]" />Service Details
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location *</Label>
            <select id="location" name="location" required className="flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950">
              <option value="northphoenix">ABC Cleaners at North Phoenix - 1930 W Pinnacle Peak Rd</option>
              <option value="biltmore">ABC Cleaners at Biltmore - 3023 N 24th St</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type *</Label>
            <select id="serviceType" name="serviceType" required className="flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950">
              <option value="both">Pickup & Delivery</option>
              <option value="pickup">Pickup Only</option>
              <option value="delivery">Delivery Only</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredDate">Preferred Date *</Label>
            <Input id="preferredDate" name="preferredDate" type="date" required min={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions (Optional)</Label>
            <textarea id="notes" name="notes" rows={3} placeholder="Any special instructions or garment care notes..." className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950" />
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-lg">
        Schedule Service
      </Button>
    </form>
  );
}
