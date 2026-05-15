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

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
