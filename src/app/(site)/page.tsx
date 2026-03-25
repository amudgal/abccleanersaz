import Link from "next/link";
import Image from "next/image";
import { Sparkles, Clock, Truck, ShieldCheck, Star, Award, Heart, Leaf, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const features = [
    { icon: <Sparkles className="w-8 h-8" />, title: "Premium Quality", description: "Expert garment care using advanced techniques and eco-friendly products" },
    { icon: <Clock className="w-8 h-8" />, title: "Same-Day Service", description: "Need it fast? We offer same-day turnaround at ABC Cleaners" },
    { icon: <Truck className="w-8 h-8" />, title: "Pickup & Delivery", description: "Free pickup and delivery for orders over $30 right to your door" },
    { icon: <ShieldCheck className="w-8 h-8" />, title: "40 Years Trusted", description: "Four decades of exceptional service to the Phoenix community" },
  ];

  const quickServices = [
    { name: "Dry Cleaning", icon: <Shirt className="w-8 h-8" />, link: "/services#dry-cleaning" },
    { name: "Wash & Fold", icon: "🧺", link: "/services#wash-fold" },
    { name: "Stain Removal", icon: "✨", link: "/stain-removal-guide" },
    { name: "Alterations", icon: "🪡", link: "/services#alterations" },
    { name: "Household Items", icon: "🛏️", link: "/services#household-items" },
    { name: "Commercial", icon: "🏢", link: "/for-business" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e4a7a] via-[#2b7fb5] to-[#3ba3d4] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTM2IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Trusted for 40 Years</span>
              </div>
              <h1 className="text-4xl md:text-6xl leading-tight">Expert Garment Care You Can Trust</h1>
              <p className="text-xl text-blue-100">
                Professional dry cleaning, laundry, and specialty services with the care your clothes deserve. Serving Phoenix with excellence since 1986.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/pickup-delivery">
                  <Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8">Schedule Pickup</Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8">Our Services</Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">40+</div>
                  <div className="text-sm text-blue-100">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-sm text-blue-100">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5★</div>
                  <div className="text-sm text-blue-100">Rated Service</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Image src="/images/mr-care-logo.png" alt="Mr. Care Mascot — ABC Cleaners Phoenix" width={500} height={500} className="w-full max-w-md drop-shadow-2xl animate-float" priority />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Why Choose Mr. Care?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">We combine traditional expertise with modern convenience to deliver exceptional garment care services.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Store Logos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4">Our Locations</h2>
          <p className="text-gray-600 text-lg">Two convenient Phoenix locations to serve you</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex justify-center items-center">
            <Image src="/images/ABC@NorthPhoenixLogo.png" alt="ABC Cleaners at North Phoenix — 1930 W Pinnacle Peak Rd, Phoenix, AZ 85027" width={400} height={200} className="max-w-full" style={{ width: 'auto', height: 'auto' }} />
          </div>
          <div className="flex justify-center items-center">
            <Image src="/images/ABC@BiltmoreLogo.png" alt="ABC Cleaners at Biltmore — 3023 N 24th St, Phoenix, AZ 85016" width={400} height={200} className="max-w-full" style={{ width: 'auto', height: 'auto' }} />
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/locations">
            <Button size="lg" variant="outline" className="border-[#2b7fb5] text-[#2b7fb5] hover:bg-blue-50">View Location Details</Button>
          </Link>
        </div>
      </section>

      {/* Services Quick Access */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Professional care for all your garments and household items</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickServices.map((service, index) => (
              <Link href={service.link} key={index}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-[#2b7fb5]">
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-4xl">{service.icon}</div>
                    <p className="font-medium text-sm">{service.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button size="lg" className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5]">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Family Business Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1e4a7a]/10 to-[#2b7fb5]/10 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-[#2b7fb5]" />
              <span className="text-sm font-semibold text-[#1e4a7a]">Family Owned & Operated</span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">A Legacy of Care & Community Commitment</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>For over 40 years, our family has been dedicated to serving the Phoenix community with excellence, integrity, and a personal touch that only a family-owned business can provide.</p>
              <p>From our family to yours, we treat every garment with the same care and attention we&apos;d give our own. Our commitment to perfection isn&apos;t just a business standard—it&apos;s a family tradition passed down through generations.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center"><div className="text-4xl mb-2">🏆</div><p className="font-semibold text-[#1e4a7a]">Excellence</p><p className="text-sm text-gray-600">In every detail</p></div>
              <div className="text-center"><div className="text-4xl mb-2">❤️</div><p className="font-semibold text-[#1e4a7a]">Family Values</p><p className="text-sm text-gray-600">Built on trust</p></div>
              <div className="text-center"><div className="text-4xl mb-2">🤝</div><p className="font-semibold text-[#1e4a7a]">Community</p><p className="text-sm text-gray-600">Serving Phoenix</p></div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1e4a7a]/20 to-[#2b7fb5]/20 rounded-2xl blur-2xl"></div>
              <Image src="/images/team-photo.png" alt="The ABC Cleaners Family Team with Mr. Care Mascot" width={600} height={400} className="relative rounded-2xl shadow-2xl w-full h-auto" />
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1e4a7a]/20 to-[#2b7fb5]/20 rounded-2xl blur-2xl"></div>
              <Image src="/images/family-photo.png" alt="ABC Cleaners dedicated team members" width={600} height={400} className="relative rounded-2xl shadow-2xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Teaser */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">What Our Customers Say</h2>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (<Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />))}
          </div>
          <p className="text-gray-600 text-lg">Rated 5 stars by hundreds of satisfied customers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { text: "Excellent service! My suits always come back looking brand new. The staff is friendly and professional.", author: "John M.", location: "North Phoenix" },
            { text: "The pickup and delivery service is a lifesaver! So convenient and my clothes are always perfectly cleaned.", author: "Sarah K.", location: "Biltmore" },
            { text: "Been using them for years. Never disappointed. Best dry cleaners in Phoenix!", author: "David R.", location: "North Phoenix" },
          ].map((review, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
                <p className="text-gray-700 italic">&ldquo;{review.text}&rdquo;</p>
                <div><p className="font-semibold">{review.author}</p><p className="text-sm text-gray-500">{review.location}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/reviews"><Button variant="outline" size="lg" className="border-[#2b7fb5] text-[#2b7fb5] hover:bg-blue-50">Read More Reviews</Button></Link>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-4"><Leaf className="w-8 h-8 text-white" /></div>
            <h2 className="text-3xl md:text-4xl mb-4">Committed to Sustainability</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">We care about your clothes and our planet. That&apos;s why we use eco-friendly practices and products.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "♻️", title: "Eco-Friendly Products", desc: "We use biodegradable detergents and green cleaning solutions that are gentle on fabrics and the environment." },
              { emoji: "💧", title: "Water Conservation", desc: "Our modern equipment uses advanced water-saving technology to reduce waste while delivering superior results." },
              { emoji: "⚡", title: "Energy Efficient", desc: "Energy-efficient machines and LED lighting help us minimize our carbon footprint every day." },
            ].map((item, i) => (
              <Card key={i} className="border-2 border-green-200 bg-white hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-5xl">{item.emoji}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl">Ready to Experience Premium Garment Care?</h2>
          <p className="text-xl text-blue-100">Schedule your first pickup and delivery today. New customers get special rates!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pickup-delivery"><Button size="lg" className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8">Get Started Now</Button></Link>
            <Link href="/locations"><Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8">Find a Location</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
