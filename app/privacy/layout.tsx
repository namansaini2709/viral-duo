import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Viral Duo",
  description: "Read the Privacy Policy of The Viral Duo to understand how we collect, safeguard, and utilize client information and campaign analytics data.",
  keywords: ["Privacy Policy", "The Viral Duo Privacy", "Data Protection Protocols"],
  openGraph: {
    title: "Privacy Policy | The Viral Duo",
    description: "Information security and privacy guidelines for partners collaborating with The Viral Duo.",
    url: "https://theviralduo.com/privacy",
  }
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
