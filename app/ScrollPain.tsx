"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const painItems = [
  "Influencer collaborations that bring views but no results",
  "Posting consistently but getting low engagement",
  "Content looks nice but doesn't perform",
  "Campaigns feel forced and salesy",
  "No clear content direction or strategy",
];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smooth(value: number) {
  const progress = clamp(value);

  return progress * progress * (3 - 2 * progress);
}

export default function ScrollPain() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let frame = 0;

    function update() {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      
      // Calculate progress across the entire scroll height of the section
      // We want the animation to start when the top of the section is at the bottom of viewport
      // and end when the bottom of the section leaves the top.
      const start = rect.top - viewport;
      const nextProgress = clamp(-start / section.offsetHeight);

      setProgress(nextProgress);
    }

    function requestUpdate() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Calculate background color transition
  // The first card starts at 0.08 and ends at 0.38 (duration 0.3).
  // It reaches the center (yPos = 0) at progress = 0.23.
  // We want the background to turn black exactly when the first card overlaps the text.
  // Trigger background to turn black exactly when the first card overlaps the text.
  const bgEntry = smooth((progress - 0.30) / 0.06); 
  
  // Trigger background to turn white IMMEDIATELY as the last card reaches the top of the screen
  const bgExit = smooth((progress - 0.69) / 0.01); // Narrower window for more "instant" feel
  
  // Final background opacity (0 = white, 1 = black)
  const bgBlackness = bgEntry * (1 - bgExit);
  
  // Heading color logic: Should turn white when background is black
  const headingColor = bgBlackness > 0.5 ? "#f7f4ed" : "var(--ink)";
 
  // Final scroll away logic for the heading
  // Starts immediately as the background turns white and last card is gone
  const scrollAwayStart = 0.69;
  const scrollAwayEnd = 0.90; // Finish sooner to keep things moving
  const scrollAway = progress > scrollAwayStart 
    ? (clamp((progress - scrollAwayStart) / (scrollAwayEnd - scrollAwayStart))) * -1200 
    : 0;
 
  return (
    <section
      ref={sectionRef}
      className="scrollPain"
      style={{
        background: "var(--paper)",
        height: isMobile ? "500vh" : "800vh", // 500vh on mobile to balance scroll fatigue and animation fluidity
      } as CSSProperties}
    >
      <div
        className="scrollPainStage"
        style={{
          background: `rgba(20, 19, 15, ${bgBlackness})`,
        }}
      >
        <div
          className="painHeading"
          style={{
            transform: `translate3d(0, ${((1 - bgEntry) * 40) + scrollAway}px, 0)`,
            color: headingColor,
            transition: "color 0.4s ease",
            opacity: 1 - clamp((progress - 0.75) * 8),
          }}
        >
          <h2>Social media feels harder than it should be</h2>
        </div>

        <div
          className="painHeading"
          style={{
            position: "absolute",
            transform: `translate3d(0, ${clamp((progress - 0.78) * 5) * -50 + 50}px, 0)`,
            opacity: clamp((progress - 0.78) * 8),
            color: "var(--ink)",
            visibility: progress > 0.78 ? "visible" : "hidden",
            transition: "none",
          }}
        >
          <h2>We make it look easy.</h2>
        </div>

        <div className="painCards" aria-label="Common social media problems">
          {painItems.map((text, i) => {
            const cardStart = 0.08 + (i * 0.05); // Reduced initial delay
            // Speed increases by 1.1x each card (duration decreases)
            const duration = 0.6 / Math.pow(1.1, i); // Increased base duration from 0.5 to 0.6
            const cardEnd = cardStart + duration;
            
            const cardProgress = clamp((progress - cardStart) / (cardEnd - cardStart));
            const active = progress >= cardStart && progress <= cardEnd;
            
            // Custom easing: slow down in the middle
            const ease = cardProgress < 0.5 
              ? 4 * cardProgress * cardProgress * cardProgress 
              : 1 - Math.pow(-2 * cardProgress + 2, 3) / 2;

            const yPos = 110 - (ease * 220); 
            const opacity = active ? smooth(1 - Math.abs(cardProgress - 0.5) * 2) : 0;
            
            // Horizontal positioning based on index
            // On mobile/tablet, stagger cards elegantly without causing overflow
            const desktopPositions = ["25%", "75%", "50%", "75%", "25%"];
            const mobilePositions = ["36%", "64%", "50%", "64%", "36%"];
            const xPos = isMobile ? (mobilePositions[i] || "50%") : (desktopPositions[i] || "50%");
            
            const rotation = 0;

            return (
              <article
                className={`painCard`}
                key={text}
                style={{
                  opacity: opacity,
                  transform: `translate3d(-50%, calc(${yPos}vh - 50%), 0) rotate(${rotation}deg) scale(${0.85 + opacity * 0.15})`,
                  visibility: active ? "visible" : "hidden",
                  left: xPos,
                  top: "50%",
                  transition: "none",
                }}
              >
                <span>×</span>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
