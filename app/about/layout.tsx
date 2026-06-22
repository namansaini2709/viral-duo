import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | The Viral Duo",
  description: "Get to know the experts at The Viral Duo. We are a results-driven UGC content creation & social media marketing growth agency building viral engines for brands.",
  keywords: ["About The Viral Duo", "Social Media Team", "UGC Agency Founders", "Shubham Goel", "Pushkar Sharma"],
  openGraph: {
    title: "About Us | The Viral Duo",
    description: "Learn more about our agency mission, vision, and team at The Viral Duo.",
    url: "https://theviralduo.com/about",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
