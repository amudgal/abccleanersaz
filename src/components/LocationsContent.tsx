"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Navigation, Star, Car, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const locations = [
  {
    name: "ABC CLEANERS AT NORTH PHOENIX",
    address: "1930 W Pinnacle Peak Rd",
    city: "Phoenix, AZ 85027",
    phone: "+16232231460",
    phoneDisplay: "(623) 223-1460",
    hours: [
      { days: "Monday - Friday", time: "7:00 AM - 6:30 PM" },
      { days: "Saturday", time: "8:00 AM - 3:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    features: [
      { icon: <Star className="w-4 h-4" />, text: "VIP Membership Available" },
    ],
    mapUrl: "https://maps.google.com/?q=1930+W+Pinnacle+Peak+Rd+Phoenix+AZ+85027",
    rating: 0,
    reviews: 0,
    logo: "/images/ABC@NorthPhoenixLogo.png",
    areas: "Norterra, Happy Valley, Deer Valley, Anthem, New River, Cave Creek",
    embedQuery: "1930+W+Pinnacle+Peak+Rd,+Phoenix,+AZ+85027",
    lat: 33.7051,
    lng: -112.1016,
  },
  {
    name: "ABC CLEANERS AT BILTMORE",
    address: "3023 N 24th St",
    city: "Phoenix, AZ 85016",
    phone: "+16029565271",
    phoneDisplay: "(602) 956-5271",
    hours: [
      { days: "Monday - Friday", time: "7:00 AM - 6:30 PM" },
      { days: "Saturday", time: "8:00 AM - 5:00 PM" },
      { days: "Sunday", time: "Closed" },
    ],
    features: [
      { icon: <Car className="w-4 h-4" />, text: "Drive-Thru Service" },
      { icon: <Package className="w-4 h-4" />, text: "24-Hour Drop Box" },
      { icon: <Star className="w-4 h-4" />, text: "VIP Membership Available" },
    ],
    mapUrl: "https://maps.google.com/?q=3023+N+24th+St+Phoenix+AZ+85016",
    rating: 0,
    reviews: 0,
    logo: "/images/ABC@BiltmoreLogo.png",
    areas: "Biltmore, Arcadia, Camelback, Paradise Valley, Central Phoenix, Midtown",
    embedQuery: "3023+N+24th+St,+Phoenix,+AZ+85016",
    lat: 33.4773,
    lng: -112.0308,
  },
];

export function LocationsContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [liveRatings, setLiveRatings] = useState<Record<string, { rating: number; reviews: number }>>({});

  useEffect(() => {
    async function fetchRatings() {
      try {
        const [npRes, bmRes] = await Promise.all([
          fetch("/api/reviews?location=north-phoenix"),
          fetch("/api/reviews?location=biltmore"),
        ]);
        const updates: Record<string, { rating: number; reviews: number }> = {};
        if (npRes.ok) {
          const np = await npRes.json();
          updates["north-phoenix"] = { rating: np.rating, reviews: np.totalReviews };
        }
        if (bmRes.ok) {
          const bm = await bmRes.json();
          updates["biltmore"] = { rating: bm.rating, reviews: bm.totalReviews };
        }
        setLiveRatings(updates);
      } catch { /* use defaults */ }
    }
    fetchRatings();
  }, []);

  const locationKeys = ["north-phoenix", "biltmore"] as const;
  const getLocationData = (index: number) => {
    const loc = locations[index];
    const live = liveRatings[locationKeys[index]];
    return {
      ...loc,
      rating: live?.rating ?? loc.rating,
      reviews: live?.reviews ?? loc.reviews,
    };
  };

  const selected = getLocationData(selectedIndex);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((_, index) => {
            const location = getLocationData(index);
            return (
            <Card
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`overflow-hidden border-2 transition-all hover:shadow-xl cursor-pointer ${
                selectedIndex === index
                  ? "border-[#2b7fb5] ring-2 ring-[#2b7fb5]/30 shadow-xl"
                  : "hover:border-[#2b7fb5]"
              }`}
            >
              <CardHeader className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{location.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(location.rating)
                                ? "fill-yellow-300 text-yellow-300"
                                : "text-white/40"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-blue-100">
                        {location.rating > 0
                          ? `${location.rating} (${location.reviews} reviews)`
                          : "Loading reviews..."}
                      </span>
                    </div>
                  </div>
                  {selectedIndex === index && (
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Showing on Map
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#2b7fb5] flex-shrink-0 mt-1" />
                  <address className="not-italic">
                    <p className="font-medium text-gray-900">{location.address}</p>
                    <p className="text-gray-600">{location.city}</p>
                  </address>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#2b7fb5] flex-shrink-0 mt-1" />
                  <a
                    href={`tel:${location.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium text-gray-900 hover:text-[#2b7fb5] transition-colors"
                  >
                    {location.phoneDisplay}
                  </a>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-[#2b7fb5] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">Hours of Operation</p>
                    {location.hours.map((hour, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{hour.days}</span>
                        <span className="text-gray-900 font-medium">{hour.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="font-medium text-gray-900 mb-3">Available Services</p>
                  {location.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <div className="text-[#2b7fb5]">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="font-medium text-gray-900 mb-1">Areas Served</p>
                  <p className="text-sm text-gray-600">{location.areas}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full border-[#2b7fb5] text-[#2b7fb5] hover:bg-blue-50">
                      <Navigation className="w-4 h-4 mr-2" />
                      Directions
                    </Button>
                  </a>
                  <a href={`tel:${location.phone}`} onClick={(e) => e.stopPropagation()} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5]">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          );
          })}
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100">
          <div className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <MapPin className="w-5 h-5" />
              <h2 className="text-lg font-semibold">{selected.name}</h2>
            </div>
            <p className="text-blue-100 text-sm hidden sm:block">
              {selected.address}, {selected.city}
            </p>
          </div>
          <div className="relative w-full" style={{ height: "450px" }}>
            <iframe
              key={selectedIndex}
              title={`Map of ${selected.name}`}
              src={`https://www.google.com/maps?q=${selected.embedQuery}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="px-6 py-3 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {locations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedIndex === idx
                      ? "bg-[#2b7fb5] text-white shadow-md"
                      : "bg-white text-gray-600 border hover:border-[#2b7fb5] hover:text-[#2b7fb5]"
                  }`}
                >
                  {idx === 0 ? "North Phoenix" : "Biltmore"}
                </button>
              ))}
            </div>
            <a
              href={selected.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#2b7fb5] hover:underline font-medium"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
