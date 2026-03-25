import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1e4a7a] to-[#2b7fb5] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl mb-4 font-semibold">Mr. Care</h3>
            <p className="text-blue-100">
              Expert garment care trusted for 40 years. Professional dry cleaning, laundry, and specialty services with the care your clothes deserve.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl mb-4 font-semibold">Our Locations</h3>
            <div className="space-y-4 text-blue-100">
              <address className="not-italic">
                <p className="font-semibold text-white">ABC CLEANERS AT NORTH PHOENIX</p>
                <p>1930 W Pinnacle Peak Rd</p>
                <p>Phoenix, AZ 85027</p>
                <a href="tel:+16029565271" className="hover:text-white transition-colors">(602) 956-5271</a>
              </address>
              <address className="not-italic">
                <p className="font-semibold text-white">ABC CLEANERS AT BILTMORE</p>
                <p>3023 N 24th St</p>
                <p>Phoenix, AZ 85016</p>
                <a href="tel:+16232231460" className="hover:text-white transition-colors">(623) 223-1460</a>
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4 font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-blue-100" aria-label="Footer navigation">
              <Link href="/services" className="hover:text-white transition-colors">Our Services</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/locations" className="hover:text-white transition-colors">Find Us</Link>
              <Link href="/reviews" className="hover:text-white transition-colors">Customer Reviews</Link>
              <Link href="/pickup-delivery" className="hover:text-white transition-colors">Schedule Pickup</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Helpful Resources */}
          <div>
            <h3 className="text-xl mb-4 font-semibold">Resources</h3>
            <nav className="flex flex-col gap-2 text-blue-100" aria-label="Resources navigation">
              <Link href="/stain-removal-guide" className="hover:text-white transition-colors">Stain Removal Guide</Link>
              <Link href="/for-business" className="hover:text-white transition-colors">For Business</Link>
              <Link href="/faq" className="hover:text-white transition-colors">Common Questions</Link>
            </nav>
            <div className="mt-4">
              <p className="text-sm text-blue-100">Hours: Mon-Fri 7AM-6PM</p>
              <p className="text-sm text-blue-100">Sat 8AM-4PM · Sun Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center text-blue-100 text-sm">
          <p>&copy; {new Date().getFullYear()} ABC Cleaners. All rights reserved. Family-owned since 1986.</p>
        </div>
      </div>
    </footer>
  );
}
