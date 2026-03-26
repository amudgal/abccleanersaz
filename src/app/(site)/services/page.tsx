import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Package, Scissors, Clock, Home, Droplet, Building2, Star, Truck, Clock3, Car, Gift } from "lucide-react";
import DryCleaningIcon from "@/components/icons/DryCleaningIcon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Services — Dry Cleaning, Laundry, Stain Removal & More",
  description: "ABC Cleaners offers dry cleaning from $3.99, wash & fold ($2.49/lb), stain removal from $5.99, alterations, household item cleaning, and commercial laundry in Phoenix AZ. Same-day service available.",
  alternates: { canonical: "https://abccleaners.com/services" },
};

export default function ServicesPage() {
  const mainServices = [
    { icon: <DryCleaningIcon className="w-8 h-8" />, id: "dry-cleaning", title: "Dry Cleaning", description: "Premium care for delicate fabrics, formal wear, and specialty garments. We use advanced techniques to preserve the quality and longevity of your clothing.", features: ["Eco-friendly solvents", "Hand finishing", "Expert pressing", "Fabric protection"], badge: "Most Popular" },
    { icon: <Package className="w-8 h-8" />, id: "wash-fold", title: "Wash & Fold Laundry", description: "Save time with our professional wash and fold service. Your clothes are cleaned, dried, and expertly folded to perfection.", features: ["Sorted by preference", "Premium detergent", "Soft & fresh", "Neatly packaged"] },
    { icon: <Droplet className="w-8 h-8" />, id: "stain-removal", title: "Stain Removal", description: "From wine to ink, our experts are trained to tackle even the toughest stains with care and precision.", features: ["Advanced techniques", "Safe for fabrics", "Multiple treatments", "Satisfaction guaranteed"] },
    { icon: <Scissors className="w-8 h-8" />, id: "alterations", title: "Repairs & Alterations", description: "Minor mends or major adjustments—we provide expert tailoring services to ensure the perfect fit and finish.", features: ["Professional tailoring", "Hem adjustments", "Button replacement", "Zipper repair"] },
    { icon: <Home className="w-8 h-8" />, id: "household-items", title: "Household Items", description: "We clean comforters, duvets, blankets, curtains, and other large or specialty household fabrics.", features: ["Comforters & duvets", "Tablecloths & linens", "Curtains & drapes", "Specialty items"] },
    { icon: <Building2 className="w-8 h-8" />, id: "commercial", title: "Commercial Laundry", description: "Bulk laundry services for businesses including restaurants, salons, gyms, and medical facilities.", features: ["Volume discounts", "Regular pickup", "Quality assurance", "Fast turnaround"] },
  ];

  const convenienceServices = [
    { icon: <Truck className="w-6 h-6" />, title: "Pickup & Delivery", description: "Free pickup and delivery for orders $30+. Schedule online and track your order." },
    { icon: <Clock className="w-6 h-6" />, title: "Same-Day Service", description: "Drop off before 9 AM and pick up the same evening at both locations.", badge: "Both Locations" },
    { icon: <Clock3 className="w-6 h-6" />, title: "24-Hour Drop Box", description: "Drop off your items at any time using our secure, around-the-clock drop-off box." },
    { icon: <Car className="w-6 h-6" />, title: "Drive-Thru Service", description: "Quick and convenient—stay in your car while we take care of your garments.", badge: "Biltmore Location" },
    { icon: <Star className="w-6 h-6" />, title: "VIP Membership", description: "Enjoy exclusive benefits like priority service, special discounts, and loyalty rewards." },
    { icon: <Gift className="w-6 h-6" />, title: "Loyalty Rewards Program", description: "Earn points with every service and redeem them for free cleaning and discounts." },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Professional garment care and laundry services tailored to meet all your needs. From everyday wear to specialty items, we handle it all with expertise.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Core Services</h2>
          <p className="text-gray-600 text-lg">Comprehensive care for all your garments and household items</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <Card key={index} id={service.id} className="hover:shadow-xl transition-all border-2 border-transparent hover:border-[#2b7fb5] relative scroll-mt-24">
              {service.badge && <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5]">{service.badge}</Badge>}
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white mb-4">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2b7fb5]"></div>{feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Convenience Features</h2>
            <p className="text-gray-600 text-lg">Making your life easier with flexible service options</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {convenienceServices.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] flex items-center justify-center text-white">{service.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                        {service.badge && <Badge variant="outline" className="text-xs border-[#2b7fb5] text-[#2b7fb5]">{service.badge}</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">Simple steps to fresh, clean garments</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Drop Off or Schedule Pickup", desc: "Visit our location or schedule a convenient pickup" },
            { step: "2", title: "We Clean with Care", desc: "Expert cleaning using premium products and techniques" },
            { step: "3", title: "Quality Check", desc: "Every item is inspected for quality before packaging" },
            { step: "4", title: "Pick Up or Delivery", desc: "Get your fresh clothes back on your schedule" },
          ].map((item, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white text-2xl font-bold">{item.step}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100">Experience the Mr. Care difference today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pickup-delivery"><Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8">Schedule Pickup & Delivery</Button></Link>
            <Link href="/pricing"><Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8">View Pricing</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
