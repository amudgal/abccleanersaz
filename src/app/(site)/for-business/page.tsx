import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Hotel, Palmtree, GraduationCap, Briefcase, UtensilsCrossed, Users, CheckCircle2, Phone, Calendar, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Commercial Laundry for Business — Hotels, Restaurants, Offices",
  description: "ABC Cleaners offers commercial laundry services in Phoenix for hotels, restaurants, spas, offices, and schools. Custom plans, volume discounts, pickup & delivery. Call (602) 956-5271.",
  alternates: { canonical: "https://abccleaners.com/for-business" },
};

export default function ForBusinessPage() {
  const industries = [
    { icon: <Hotel className="w-8 h-8" />, title: "Hotels & Resorts", description: "Crisp bed linens, towels, and uniforms with scheduled pickups and quick turnarounds." },
    { icon: <Palmtree className="w-8 h-8" />, title: "Spas & Salons", description: "Professionally cleaned robes, towels, and staff uniforms. Always spa-ready." },
    { icon: <GraduationCap className="w-8 h-8" />, title: "Schools & Education", description: "Uniforms, sports kits, and lab coats kept fresh and professional." },
    { icon: <Briefcase className="w-8 h-8" />, title: "Corporate Offices", description: "Clean and pressed uniforms, dress shirts, and bulk staff laundry." },
    { icon: <UtensilsCrossed className="w-8 h-8" />, title: "Restaurants & Cafés", description: "Aprons, chef jackets, and table linens with fast, frequent service." },
    { icon: <Users className="w-8 h-8" />, title: "Community Centers", description: "Bulk laundry solutions and convenient pickup & drop-off options." },
  ];

  const benefits = [
    { title: "Custom Service Plans", description: "Tailored to your volume, schedule, and fabric care needs" },
    { title: "Commercial-Grade Equipment", description: "For maximum efficiency and hygiene" },
    { title: "Eco-Friendly Practices", description: "To support sustainable operations" },
    { title: "Pickup & Delivery Options", description: "That save time and reduce workload" },
    { title: "Dedicated Account Support", description: "For smooth, responsive service" },
    { title: "Volume Discounts", description: "Competitive pricing for bulk orders" },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#1e4a7a] via-[#2b7fb5] to-[#3ba3d4] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative text-center space-y-6">
          <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-lg px-6 py-2 border-2 border-white">Commercial Services</Badge>
          <h1 className="text-4xl md:text-6xl leading-tight max-w-4xl mx-auto">Tailored Laundry & Linen Solutions for Every Industry</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Reliable, high-quality, and flexible laundry services tailored to the unique needs of your business.</p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="tel:+16029565271"><Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8"><Phone className="w-5 h-5 mr-2" />Contact Us Today</Button></a>
            <Link href="/pickup-delivery"><Button size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8"><Calendar className="w-5 h-5 mr-2" />Schedule Service</Button></Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20"><path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="#f9fafb"></path></svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center mb-12">
          <Image src="/images/mr-care-business.png" alt="Mr. Care - Professional Business Services" width={384} height={384} className="w-64 md:w-80 lg:w-96 h-auto drop-shadow-2xl" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Who We Serve</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">We support your operations with professional garment and linen care.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-all border-2 border-transparent hover:border-[#2b7fb5]">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white mb-4">{industry.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why Partner With Us?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#2b7fb5] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 border-2 border-green-200 text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Eco-Friendly Business Solutions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">All our commercial services use eco-friendly products and energy-efficient processes to support your sustainability goals.</p>
        </div>
      </section>
    </div>
  );
}
