import type { Metadata } from "next";
import "./globals.css";
import { businessJsonLd, locationsJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://abccleaners.com"),
  title: {
    default: "ABC Cleaners — Professional Dry Cleaning & Laundry in Phoenix, AZ | Mr. Care",
    template: "%s | ABC Cleaners Phoenix",
  },
  description:
    "ABC Cleaners (Mr. Care) — Phoenix's trusted dry cleaning & laundry since 1986. Stain removal from $5.99, shirts $3.99, suits $14.99. Pickup & delivery over $30. Two locations: North Phoenix & Biltmore. Same-day service, eco-friendly, 5-star rated.",
  keywords: [
    "dry cleaning Phoenix",
    "laundry service Phoenix AZ",
    "stain removal Phoenix",
    "ABC Cleaners",
    "Mr Care cleaners",
    "dry cleaning near me",
    "same day dry cleaning Phoenix",
    "pickup delivery dry cleaning",
    "eco-friendly dry cleaning",
    "wash and fold Phoenix",
    "alterations Phoenix",
    "commercial laundry Phoenix",
    "best dry cleaners Phoenix",
    "affordable dry cleaning",
    "North Phoenix dry cleaners",
    "Biltmore dry cleaners",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abccleaners.com",
    siteName: "ABC Cleaners",
    title: "ABC Cleaners — Professional Dry Cleaning & Laundry in Phoenix, AZ",
    description:
      "Trusted for 40+ years. Dry cleaning, stain removal, wash & fold, alterations. Pickup & delivery. Two Phoenix locations. 5-star rated.",
    images: [{ url: "/images/mr-care-logo.png", width: 1200, height: 630, alt: "ABC Cleaners Mr. Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABC Cleaners — Dry Cleaning & Laundry Phoenix AZ",
    description: "40+ years trusted. Stain removal from $5.99. Pickup & delivery. Same-day service.",
    images: ["/images/mr-care-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://abccleaners.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/mr-care-small.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {locationsJsonLd.map((loc, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(loc) }}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
