import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Product Photoshoots & Staging | The Viral Duo",
  description: "Showcase your brand with high-end commercial staging product photography by The Viral Duo. Custom set designs, travertine staging, and full commercial rights.",
  keywords: ["Commercial Product Photoshoots", "Cosmetics Photography", "Travertine Product Staging", "E-commerce Product Photography", "The Viral Duo Shoots"],
  openGraph: {
    title: "Commercial Product Photoshoots & Staging | The Viral Duo",
    description: "Premium e-commerce product staging, lighting, and conceptual shoots by The Viral Duo.",
    url: "https://theviralduo.com/photoshoots",
  }
};

export default function PhotoshootsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
