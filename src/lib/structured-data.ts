export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  "@id": "https://abccleaners.com/#organization",
  name: "ABC Cleaners",
  alternateName: ["Mr. Care", "ABC Cleaners Phoenix", "Norterra Cleaners"],
  description:
    "ABC Cleaners (Mr. Care) is a family-owned professional dry cleaning and laundry service in Phoenix, AZ. Trusted for 40+ years with eco-friendly practices, same-day service, and pickup & delivery.",
  url: "https://abccleaners.com",
  logo: "https://abccleaners.com/images/mr-care-logo.png",
  image: "https://abccleaners.com/images/mr-care-logo.png",
  telephone: "+16029565271",
  foundingDate: "1986",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  areaServed: {
    "@type": "City",
    name: "Phoenix",
    containedInPlace: {
      "@type": "State",
      name: "Arizona",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "221",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dry Cleaning & Laundry Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Dry Cleaning",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Suit Dry Cleaning (2-piece)" },
            price: "14.99",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Dress Shirt Dry Cleaning" },
            price: "3.99",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Dress Dry Cleaning" },
            price: "12.99",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Pants/Trousers Dry Cleaning" },
            price: "7.99",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Stain Removal",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Professional Stain Removal",
              description:
                "Expert stain removal for wine, ink, grease, oil, blood, coffee, grass, paint, and makeup stains",
            },
            price: "5.99",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Wash & Fold",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Wash & Fold Laundry (per lb)" },
            price: "2.49",
            priceCurrency: "USD",
          },
        ],
      },
    ],
  },
};

export const locationsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": "https://abccleaners.com/#north-phoenix",
    name: "ABC Cleaners at North Phoenix",
    description:
      "Professional dry cleaning and laundry at North Phoenix. VIP membership and pickup & delivery.",
    url: "https://abccleaners.com/locations",
    image: "https://abccleaners.com/images/ABC@NorthPhoenixLogo.png",
    telephone: "+16232231460",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1930 W Pinnacle Peak Rd",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      postalCode: "85027",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.7055,
      longitude: -112.1072,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    parentOrganization: { "@id": "https://abccleaners.com/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": "https://abccleaners.com/#biltmore",
    name: "ABC Cleaners at Biltmore",
    description:
      "Professional dry cleaning and laundry near Biltmore Phoenix. Drive-thru, 24-hour drop box, VIP membership, and pickup & delivery.",
    url: "https://abccleaners.com/locations",
    image: "https://abccleaners.com/images/ABC@BiltmoreLogo.png",
    telephone: "+16029565271",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3023 N 24th St",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      postalCode: "85016",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.4872,
      longitude: -112.0294,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "94",
    },
    parentOrganization: { "@id": "https://abccleaners.com/#organization" },
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "I got a stain on my shirt. Can ABC Cleaners help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! ABC Cleaners specializes in professional stain removal for all fabric types including wine, ink, grease, oil, blood, coffee, grass, paint, and makeup stains. Prices start at $5.99 per garment. Visit us at 1930 W Pinnacle Peak Rd (North Phoenix) or 3023 N 24th St (Biltmore), or schedule a pickup and delivery for orders over $30.",
      },
    },
    {
      "@type": "Question",
      name: "How much does dry cleaning cost at ABC Cleaners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dress shirts start at $3.99, pants at $7.99, suits (2-piece) at $14.99, and dresses from $12.99. Wash & fold laundry is $2.49/lb. We offer competitive pricing with premium quality for all garment care services in Phoenix, AZ.",
      },
    },
    {
      "@type": "Question",
      name: "Does ABC Cleaners offer pickup and delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer pickup and delivery for orders over $30 throughout the Greater Phoenix metropolitan area. For orders under $30, there is a $5.99 delivery fee. Schedule online or call North Phoenix at (602) 956-5271 or Biltmore at (623) 223-1460.",
      },
    },
    {
      "@type": "Question",
      name: "What are ABC Cleaners' hours of operation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "North Phoenix is open Monday through Friday 7:00 AM to 6:30 PM and Saturday 8:00 AM to 3:00 PM. Biltmore is open Monday through Friday 7:00 AM to 6:30 PM and Saturday 8:00 AM to 5:00 PM. Both locations are closed Sundays.",
      },
    },
    {
      "@type": "Question",
      name: "Where is ABC Cleaners located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ABC Cleaners has two Phoenix locations: North Phoenix at 1930 W Pinnacle Peak Rd, Phoenix, AZ 85027 (phone: 602-956-5271) and Biltmore at 3023 N 24th St, Phoenix, AZ 85016 (phone: 623-223-1460). Biltmore offers drive-thru service and 24-hour drop box.",
      },
    },
    {
      "@type": "Question",
      name: "Is ABC Cleaners eco-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! ABC Cleaners is committed to sustainable practices. We use biodegradable detergents, water-saving technology, and energy-efficient equipment to minimize our environmental impact while delivering superior garment care results.",
      },
    },
    {
      "@type": "Question",
      name: "Does ABC Cleaners offer same-day dry cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Same-day service is available at Biltmore location. Drop off your items before 9 AM and pick them up the same evening. Express wash & fold service is also available at $3.49/lb.",
      },
    },
    {
      "@type": "Question",
      name: "Does ABC Cleaners offer commercial laundry services for businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We provide commercial laundry services for hotels, restaurants, spas, corporate offices, schools, and community centers. Custom service plans, volume discounts, and dedicated account support available. Call (602) 956-5271 for a business quote.",
      },
    },
  ],
};
