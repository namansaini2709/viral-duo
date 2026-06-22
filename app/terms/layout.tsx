import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Viral Duo",
  description: "Review the Terms & Conditions of service at The Viral Duo, covering UGC deliverables licensing, content creation parameters, revisions, and consultations.",
  keywords: ["Terms and Conditions", "The Viral Duo Terms", "Content Creator Agreement"],
  openGraph: {
    title: "Terms & Conditions | The Viral Duo",
    description: "Legal parameters, revision limits, and terms for hiring content services from The Viral Duo.",
    url: "https://theviralduo.com/terms",
  }
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
