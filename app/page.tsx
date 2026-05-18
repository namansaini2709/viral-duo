"use client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import BrandStrip from "./BrandStrip";
import ScrollPain from "./ScrollPain";
import MissionSection from "./MissionSection";
import FeaturedProjects from "./FeaturedProjects";
import ExploreMore from "./ExploreMore";
import ServicesSection from "./ServicesSection";
import CompareSection from "./CompareSection";
import ProcessSection from "./ProcessSection";
import TeamSection from "./TeamSection";
import FaqSection from "./FaqSection";
import CtaSection from "./CtaSection";
import FooterSection from "./FooterSection";

export default function Home() {
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isRevealFixed, setIsRevealFixed] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    if (footerRef.current) {
      const updateFooter = () => {
        if (footerRef.current) {
          const height = footerRef.current.offsetHeight;
          setFooterHeight(height);
          // Disable fixed reveal on mobile/tablet for better UX
          setIsRevealFixed(window.innerWidth > 1024);
        }
      };

      updateFooter();
      window.addEventListener('resize', updateFooter);

      const resizeObserver = new ResizeObserver(updateFooter);
      resizeObserver.observe(footerRef.current);

      return () => {
        window.removeEventListener('resize', updateFooter);
        resizeObserver.disconnect();
      };
    }
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest < 50);

    if (latest > lastScrollY && latest > 150) {
      setIsHidden(true);
    } else if (latest < lastScrollY) {
      setIsHidden(false);
    }
    
    const vh = window.innerHeight;
    const scrollPainStart = vh;
    const blackStart = scrollPainStart + 800 * (vh / 100) * 0.28;
    const blackEnd = scrollPainStart + 800 * (vh / 100) * 0.70;

    const ctaStart = document.body.scrollHeight - vh - 200;

    if ((latest > blackStart && latest < blackEnd) || latest > ctaStart) {
      setNavTheme('light');
    } else {
      setNavTheme('dark');
    }

    const isAtBottom = latest > (document.body.scrollHeight - footerHeight - 300);
    setIsOverFooter(isAtBottom);

    setLastScrollY(latest);
  });

  return (
    <main>
      <Navbar 
        isAtTop={isAtTop} 
        isHidden={isHidden} 
        navTheme={navTheme} 
        isOverFooter={isOverFooter} 
      />

      <div
        className="mainContentWrapper"
        style={{
          marginBottom: isRevealFixed ? `${footerHeight}px` : '0px',
          position: 'relative',
          zIndex: 2,
          background: 'var(--paper)',
          boxShadow: isRevealFixed ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
          paddingBottom: '15px',
          width: '100%',
          minWidth: '100%',
        }}
      >
        <HeroSection />
        <BrandStrip />
        <ScrollPain />
        <MissionSection />
        <FeaturedProjects />
        <ExploreMore />
        <ServicesSection />
        <CompareSection />
        <ProcessSection />
        <TeamSection />
        <FaqSection />
        <CtaSection />
      </div>

      <FooterSection 
        ref={footerRef} 
        isRevealFixed={isRevealFixed} 
      />
    </main>
  );
}
