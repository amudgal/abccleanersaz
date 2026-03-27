import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { readJsonFile, PricingData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing — Dry Cleaning, Laundry & Stain Removal Prices",
  description: "ABC Cleaners Phoenix pricing: Dress shirts $3.99, suits $14.99, wash & fold $2.49/lb, stain removal from $5.99. Pickup & delivery. Affordable professional garment care.",
  alternates: { canonical: "https://abccleaners.com/pricing" },
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const data = await readJsonFile<PricingData>("pricing.json");

  if (!data || !data.visible) {
    return (
      <div>
        <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Pricing</h1>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-xl text-gray-500">Pricing information is currently being updated. Please call us for current rates.</p>
          <a href="tel:+16029565271"><Button size="lg" className="mt-6 bg-[#1e4a7a] text-white">Call (602) 956-5271</Button></a>
        </section>
      </div>
    );
  }

  const PriceTable = ({ title, items, highlight }: { title: string; items: { item: string; price: string }[]; highlight?: boolean }) => (
    <Card className={highlight ? "border-2 border-[#2b7fb5] shadow-xl" : "shadow-lg"}>
      <CardHeader className={highlight ? "bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white" : ""}>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full">
          <tbody>
            {items.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-3 text-sm text-gray-700">{row.item}</td>
                <td className="px-6 py-3 text-sm font-semibold text-right text-[#1e4a7a]">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  const categories = data.categories;

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Pricing</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transparent, competitive pricing for all our garment care services. No hidden fees.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <PriceTable key={cat.id} title={cat.title} items={cat.items} highlight={cat.highlight} />
          ))}
        </div>

        {/* Pickup & Delivery pricing */}
        <Card className="mt-8 shadow-lg border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              Pickup & Delivery <Badge className="bg-green-500">Orders Over $30</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-green-600">FREE</p>
                <p className="text-gray-600 mt-1">Orders over $30</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-[#2b7fb5]">24-48 hrs</p>
                <p className="text-gray-600 mt-1">Typical turnaround</p>
              </div>
            </div>
            {data.pickupDeliveryNote && (
              <p className="text-center text-sm text-gray-600 mt-4 border-t pt-4">{data.pickupDeliveryNote}</p>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6 italic">
          * Prices may vary based on fabric, design or special care. Environmental fee not included.
        </p>
      </section>

      <section className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100">Schedule a pickup or visit us today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pickup-delivery"><Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8">Schedule Pickup</Button></Link>
            <Link href="/locations"><Button size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8">Find a Location</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
