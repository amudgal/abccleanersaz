import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LocationsContent } from "@/components/LocationsContent";

export const metadata: Metadata = {
  title: "Locations — North Phoenix & Biltmore",
  description: "ABC Cleaners has two Phoenix locations: North Phoenix at 1930 W Pinnacle Peak Rd (602-956-5271) and Biltmore at 3023 N 24th St (623-223-1460). Mon-Fri 7AM-6PM, Sat 8AM-4PM. Drive-thru & 24hr drop box.",
  alternates: { canonical: "https://abccleaners.com/locations" },
};

export default function LocationsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Our Locations</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Visit one of our two convenient Phoenix locations. We&apos;re here to serve you with exceptional garment care.</p>
        </div>
      </section>

      <LocationsContent />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-4">We Serve the Greater Phoenix Area</h2>
          <p className="text-gray-600 text-lg mb-6">Both locations offer convenient pickup and delivery services throughout Phoenix and surrounding areas. Can&apos;t make it to our store? We&apos;ll come to you!</p>
          <Button size="lg" className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5]" asChild>
            <a href="/pickup-delivery">Schedule Pickup & Delivery</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
