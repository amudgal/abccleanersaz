import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Truck, HelpCircle } from "lucide-react";
import { readJsonFile, FaqsData } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Our Dry Cleaning Services",
  description:
    "Find answers about ABC Cleaners: pricing, stain removal, pickup & delivery, hours, locations in Phoenix AZ, eco-friendly cleaning, same-day service, and more.",
  alternates: { canonical: "https://abccleaners.com/faq" },
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const data = await readJsonFile<FaqsData>("faqs.json");

  if (!data || !data.visible) {
    return (
      <div>
        <section className="bg-gradient-to-br from-[#1e4a7a] via-[#2b7fb5] to-[#3ba3d4] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
          </div>
        </section>
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <p className="text-xl text-gray-500">FAQ section is currently being updated. Please call us with any questions.</p>
          <a href="tel:+16029565271"><Button size="lg" className="mt-6 bg-[#1e4a7a] text-white">Call (602) 956-5271</Button></a>
        </section>
      </div>
    );
  }

  const visibleFaqs = data.faqs.filter((f) => f.visible);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-gradient-to-br from-[#1e4a7a] via-[#2b7fb5] to-[#3ba3d4] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to know about ABC Cleaners services, pricing,
            and locations in Phoenix, AZ.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {visibleFaqs.map((faq, index) => (
            <details
              key={faq.id}
              className="group border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#2b7fb5] transition-colors"
            >
              <summary className="flex items-center gap-4 p-6 cursor-pointer list-none select-none bg-white hover:bg-blue-50/50 transition-colors">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] text-white flex-shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold flex-1 text-left">
                  {faq.question}
                </h2>
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#1e4a7a] to-[#2b7fb5] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Still have questions?
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-xl mx-auto">
            Our team is happy to help. Call us or schedule a pickup and
            we&apos;ll take care of the rest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+16029565271">
              <Button
                size="lg"
                className="bg-white text-[#1e4a7a] hover:bg-gray-100 text-lg px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                (602) 956-5271
              </Button>
            </a>
            <Link href="/pickup-delivery">
              <Button
                size="lg"
                className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-[#1e4a7a] text-lg px-8"
              >
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
