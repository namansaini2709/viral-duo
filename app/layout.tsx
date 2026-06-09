import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "The Viral Duo | Social Media & UGC Growth Agency",
  description: "The Viral Duo helps brands create content that earns attention, builds engagement, and drives real growth through explosive UGC and social media strategies.",
  keywords: ["UGC", "Social Media Marketing", "Content Creation", "Viral Marketing", "The Viral Duo"],
  authors: [{ name: "The Viral Duo" }],
  openGraph: {
    title: "The Viral Duo | Social Media & UGC Growth Agency",
    description: "Built by people who won't ship content they'd skip. Explosive growth engines for modern brands.",
    url: "https://theviralduo.com",
    siteName: "The Viral Duo",
    images: [
      {
        url: "/logo-v2.png",
        width: 800,
        height: 800,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://theviralduo.com"),
  twitter: {
    card: "summary_large_image",
    title: "The Viral Duo | Social Media & UGC Growth Agency",
    description: "Built by people who won't ship content they'd skip.",
    images: ["/logo-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo-v2.png",
    apple: "/logo-v2.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbb6ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "The Viral Duo",
    "url": "https://theviralduo.com",
    "logo": "https://theviralduo.com/logo-v2.png",
    "image": "https://theviralduo.com/logo-v2.png",
    "description": "The Viral Duo helps brands create content that earns attention, builds engagement, and drives real growth through explosive UGC and social media strategies.",
    "telephone": "+917701918603",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Delhi NCR"
      },
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country",
        "name": "Worldwide"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Shubham Goel"
      },
      {
        "@type": "Person",
        "name": "Pushkar Sharma"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/theviralduo",
      "https://www.facebook.com/share/14bgTEGnxeU/",
      "https://www.linkedin.com/company/the-viral-duo/"
    ],
    "priceRange": "$$",
    "knowsAbout": [
      "Social Media Marketing",
      "UGC Creation",
      "Short-Form Video Production",
      "Influencer Marketing",
      "Brand Growth Strategy",
      "Product Photoshoots",
      "Event Video Coverage"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
