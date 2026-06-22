import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Video Coverage & Live Strategy | The Viral Duo",
  description: "Capture high-energy live events with The Viral Duo. From college festivals to premium auto shows, we deploy mobile content crews to create viral video recaps.",
  keywords: ["Event Video Coverage", "Live Event Content Creators", "Festival Video Reels", "Sufi Night Viral Video", "The Viral Duo Events"],
  openGraph: {
    title: "Event Video Coverage & Live Strategy | The Viral Duo",
    description: "Real-time vertical video production and viral coverage for your events and festivals.",
    url: "https://theviralduo.com/event-coverage",
  }
};

export default function EventCoverageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
