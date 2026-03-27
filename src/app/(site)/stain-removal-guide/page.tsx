import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Truck, Clock, MapPin, AlertTriangle, Droplets, Coffee, Wine, Paintbrush, Shirt, Bug, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Stain Removal Guide — How to Remove Stains on Clothes | ABC Cleaners Phoenix",
  description:
    "Got a stain on your shirt? ABC Cleaners in Phoenix offers professional stain removal starting at $5.99. Wine, grease, ink, coffee, blood stain treatment. Pickup on orders $30+.",
  keywords: [
    "stain removal phoenix",
    "remove stain from shirt",
    "wine stain removal",
    "grease stain cleaner",
    "ink stain removal near me",
    "coffee stain on clothes",
    "professional stain treatment",
    "dry cleaner stain removal phoenix az",
  ],
  alternates: { canonical: "https://abccleaners.com/stain-removal-guide" },
};

const stainTypes = [
  {
    icon: <Coffee className="w-6 h-6" />,
    stain: "Coffee & Tea",
    difficulty: "Medium",
    home: "Blot with cold water and dish soap immediately. Avoid hot water.",
    pro: "Best results within 24 hours. Our enzymatic treatment removes tannin-based stains completely.",
    price: "$5.99",
  },
  {
    icon: <Wine className="w-6 h-6" />,
    stain: "Red Wine",
    difficulty: "Hard",
    home: "Blot (don't rub), apply salt, then rinse with cold water.",
    pro: "Red wine sets fast. Bring it in ASAP — our advanced treatment handles even dried wine stains.",
    price: "$12.99",
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    stain: "Grease & Oil",
    difficulty: "Hard",
    home: "Apply baking soda or cornstarch to absorb oil. Blot gently.",
    pro: "Grease bonds to fabric quickly. Professional solvent-based cleaning removes it without damage.",
    price: "$12.99",
  },
  {
    icon: <Paintbrush className="w-6 h-6" />,
    stain: "Ink & Marker",
    difficulty: "Very Hard",
    home: "Dab with rubbing alcohol on a cloth. Do NOT rub — it spreads the ink.",
    pro: "Ink stains are best handled professionally. Our specialty treatment targets dye-based and ballpoint inks.",
    price: "$19.99",
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    stain: "Blood",
    difficulty: "Medium",
    home: "Rinse immediately with COLD water. Never use hot water on blood.",
    pro: "Cold-water enzyme treatment breaks down proteins. Even older bloodstains can often be removed.",
    price: "$12.99",
  },
  {
    icon: <Bug className="w-6 h-6" />,
    stain: "Grass & Mud",
    difficulty: "Medium",
    home: "Let mud dry, brush off excess, then soak in cold water with detergent.",
    pro: "Our multi-step process removes chlorophyll and earth pigments for good.",
    price: "$5.99",
  },
  {
    icon: <Flame className="w-6 h-6" />,
    stain: "Sauce & Ketchup",
    difficulty: "Medium",
    home: "Scrape off excess, rinse with cold water from the back of the stain.",
    pro: "Tomato-based stains respond well to professional treatment. Best within 48 hours.",
    price: "$5.99",
  },
  {
    icon: <Shirt className="w-6 h-6" />,
    stain: "Sweat & Deodorant",
    difficulty: "Medium",
    home: "Soak in mixture of white vinegar and baking soda before washing.",
    pro: "Yellowish buildup and aluminum residue removed with our specialized pre-treatment.",
    price: "$5.99",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Handle Stains on Clothing",
  description:
    "Step-by-step guide to treating common stains at home and when to use professional stain removal services from ABC Cleaners in Phoenix, AZ.",
  step: [
    { "@type": "HowToStep", name: "Act Fast", text: "Blot the stain immediately — don't rub. The quicker you act, the easier removal will be." },
    { "@type": "HowToStep", name: "Use Cold Water", text: "Rinse with cold water from the back of the fabric. Hot water sets most stains permanently." },
    { "@type": "HowToStep", name: "Avoid DIY Chemicals", text: "Don't use bleach or random solvents — they can damage the fabric or set the stain further." },
    { "@type": "HowToStep", name: "Bring to ABC Cleaners", text: "For stubborn or delicate-fabric stains, bring your garment to ABC Cleaners. Our expert technicians use professional solvents and techniques. Stain removal starts at $5.99." },
  ],
};

export default function StainRemovalGuidePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative bg-gradient-to-br from-[#1e4a7a] via-[#2b7fb5] to-[#3ba3d4] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center space-y-6">
          <Badge className="bg-red-500/20 backdrop-blur-sm text-lg px-6 py-2 border-2 border-red-300 text-red-100">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Stain Emergency?
          </Badge>
          <h1 className="text-4xl md:text-6xl leading-tight max-w-4xl mx-auto">
            Got a Stain? We Can Help.
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Whether it&apos;s wine on your favorite shirt, grease on your work
            pants, or ink on a dress — ABC Cleaners in Phoenix has been removing
            tough stains for over 40 years. Professional stain removal starts at
            just <strong>$5.99</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="tel:+16029565271">
              <Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
            <Link href="/pickup-delivery">
              <Button size="lg" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8">
                <Truck className="w-5 h-5 mr-2" />
                Pickup on $30+
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      {/* Quick First-Aid Steps */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Stain First Aid — What To Do Right Now</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Follow these steps immediately for the best chance of removing the stain.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Blot Immediately", desc: "Use a clean cloth to blot — never rub. Rubbing pushes the stain deeper." },
            { step: "2", title: "Use Cold Water", desc: "Rinse from the back with cold water. Hot water sets most stains permanently." },
            { step: "3", title: "Don't Use Bleach", desc: "Avoid bleach or random chemicals. They can damage fabric and make stains worse." },
            { step: "4", title: "Bring It To Us", desc: "For best results, bring the stained garment to ABC Cleaners within 24–48 hours." },
          ].map((item) => (
            <Card key={item.step} className="text-center border-2 hover:border-[#2b7fb5] transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stain-by-Stain Guide */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Common Stains & How We Treat Them</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every stain is different. Here&apos;s what you can try at home, and how
              our professionals handle it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {stainTypes.map((s, i) => (
              <Card key={i} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white flex items-center justify-center">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{s.stain}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.difficulty === "Very Hard" ? "bg-red-100 text-red-700" : s.difficulty === "Hard" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {s.difficulty}
                      </span>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm text-gray-500">Professional</div>
                      <div className="text-lg font-bold text-[#2b7fb5]">
                        {s.price}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">At Home: </span>
                      <span className="text-gray-600">{s.home}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#2b7fb5]">Our Experts: </span>
                      <span className="text-gray-600">{s.pro}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Stain Removal Pricing</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { tier: "Basic", price: "$5.99", desc: "Coffee, tea, grass, mud, food, sweat stains", note: "Most common stains" },
            { tier: "Advanced", price: "$12.99", desc: "Wine, grease, oil, blood, older stains", note: "Tough / set-in stains" },
            { tier: "Specialty", price: "$19.99", desc: "Ink, dye transfer, paint, permanent marker", note: "Requires special solvents" },
          ].map((tier) => (
            <Card key={tier.tier} className="text-center border-2 hover:border-[#2b7fb5] transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">{tier.tier}</h3>
                <div className="text-4xl font-bold text-[#2b7fb5] mb-4">{tier.price}</div>
                <p className="text-gray-600 mb-2">{tier.desc}</p>
                <p className="text-sm text-gray-400">{tier.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Location + CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Drop Off or Schedule Pickup</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Bring your stained garment to either location or schedule a
              pickup (orders $30+). Typical turnaround: 24–48 hours.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">
                <MapPin className="w-5 h-5 inline mr-2" />
                North Phoenix
              </h3>
              <p className="text-blue-100">1930 W Pinnacle Peak Rd, Phoenix AZ 85027</p>
              <p className="text-blue-100 mt-1"><Phone className="w-4 h-4 inline mr-1" />(623) 223-1460</p>
              <p className="text-blue-100 mt-1"><Clock className="w-4 h-4 inline mr-1" />Mon–Fri 7–6, Sat 8–4</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">
                <MapPin className="w-5 h-5 inline mr-2" />
                Biltmore
              </h3>
              <p className="text-blue-100">3023 N 24th St, Phoenix AZ 85016</p>
              <p className="text-blue-100 mt-1"><Phone className="w-4 h-4 inline mr-1" />(602) 956-5271</p>
              <p className="text-blue-100 mt-1"><Clock className="w-4 h-4 inline mr-1" />Mon–Fri 7–6, Sat 8–4</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+16029565271">
              <Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </Button>
            </a>
            <Link href="/pickup-delivery">
              <Button size="lg" className="bg-white/20 border-2 border-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8">
                <Truck className="w-5 h-5 mr-2" />
                Schedule Pickup
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
