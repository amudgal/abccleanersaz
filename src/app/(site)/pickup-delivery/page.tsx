import type { Metadata } from "next";
import Link from "next/link";
import { Package, MapPin, ExternalLink, ShieldCheck, Shirt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pickup & Delivery — Free for Orders Over $30",
  description: "Schedule free dry cleaning pickup & delivery in Phoenix AZ for orders over $30. 24-48 hour turnaround. Same-day available. Serving Greater Phoenix area. ABC Cleaners.",
  alternates: { canonical: "https://abccleaners.com/pickup-delivery" },
};

export default function PickupDeliveryPage() {
  const howItWorks = [
    { step: "1", title: "Sign Up", description: "Complete the form with your details and preferred schedule" },
    { step: "2", title: "We Pick Up", description: "Our team arrives at your location on your scheduled day" },
    { step: "3", title: "Expert Care", description: "Your items are professionally cleaned with premium care" },
    { step: "4", title: "Delivery", description: "Fresh, clean items delivered back to your door" },
  ];

  const services: { name: string; icon: React.ReactNode }[] = [
    { name: "Dry Cleaning", icon: <Shirt className="w-8 h-8" /> },
    { name: "Wash & Fold", icon: "🧺" },
    { name: "Stain Removal", icon: "✨" },
    { name: "Alterations", icon: "🪡" },
    { name: "Household Items", icon: "🛏️" },
    { name: "Commercial", icon: "🏢" },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Package className="w-5 h-5" /><span>Convenient & Reliable</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">Pickup & Delivery Service</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Schedule seamless pickup and delivery at your convenience. Free for orders over $30. We bring premium garment care right to your doorstep.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {howItWorks.map((item, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white text-2xl font-bold">{item.step}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-4">Services Available for Pickup & Delivery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-4xl">{service.icon}</div>
                  <p className="font-medium text-sm">{service.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <Card className="border-2 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white">
            <CardTitle className="text-2xl">Schedule Your Service</CardTitle>
            <CardDescription className="text-blue-100">Choose your location to log in and schedule pickup &amp; delivery</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <a
                href="https://norterracleaners.smrtapp.com/custx/login"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-5 border-2 hover:border-[#2b7fb5] hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-4 w-full">
                    <MapPin className="w-7 h-7 text-[#2b7fb5] flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900 text-base">ABC Cleaners @ North Phoenix</div>
                      <div className="text-sm text-gray-500 font-normal">1930 W Pinnacle Peak Rd, Phoenix AZ 85027</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Button>
              </a>

              <a
                href="https://azbestdrycleaning.smrtapp.com/custx/login"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-5 border-2 hover:border-[#2b7fb5] hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-4 w-full">
                    <MapPin className="w-7 h-7 text-[#2b7fb5] flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-semibold text-gray-900 text-base">ABC Cleaners @ Biltmore</div>
                      <div className="text-sm text-gray-500 font-normal">3023 N 24th St, Phoenix AZ 85016</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Button>
              </a>

              <div className="pt-4 border-t mt-6">
                <Link href="/admin/login">
                  <Button variant="ghost" className="w-full text-gray-500 hover:text-[#2b7fb5]">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
