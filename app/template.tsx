"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);

  React.useEffect(() => {
    setIsAnimating(true);
    if (typeof window !== "undefined") {
      (window as any).__pageTransitionActive = true;
    }

    // Trigger entrance animations inside the page early (after 150ms)
    // so they animate concurrently with the premium 3D page-flip transition
    const animationTriggerTimer = setTimeout(() => {
      if (typeof window !== "undefined") {
        (window as any).__pageTransitionActive = false;
        window.dispatchEvent(new CustomEvent("page-transition-finished"));
      }
    }, 150);

    // Keep scrolling/interaction lock for the full duration of the 3D flip animation
    const lockTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 950);

    return () => {
      clearTimeout(animationTriggerTimer);
      clearTimeout(lockTimer);
    };
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: "100%",
        perspective: isAnimating ? "2000px" : "none",
        perspectiveOrigin: "50% 50%",
        position: "relative",
      }}
    >
      {/* 
        Page Content Wrapper:
        Performs the 3D page-turn flip transition directly on the page itself.
        It swings in from the bottom-left corner (left bottom transform origin)
        to simulate a premium book page turning.
      */}
      <motion.div
        variants={{
          initial: { 
            opacity: 0, 
            scale: 0.94, 
            rotateY: -75,
            rotateZ: -8,
            x: "-25%"
          },
          animate: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            rotateZ: 0,
            x: "0%",
            transition: {
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1] // Premium easeOut Expo
            }
          },
          exit: { 
            opacity: 0, 
            scale: 0.94, 
            rotateY: 75,
            rotateZ: 8,
            x: "25%",
            transition: {
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1]
            }
          },
        }}
        onAnimationComplete={() => {
          setIsAnimating(false);
        }}
        style={isAnimating ? { 
          width: '100%', 
          transformOrigin: "left bottom",
          backfaceVisibility: "hidden",
          backgroundColor: "var(--paper)", // Match page background during rotation
          minHeight: "100vh",
          // Temporarily lock height and overflow during animation to ensure
          // the bottom-left corner of the container aligns with the viewport bottom-left
          height: "100vh",
          overflow: "hidden",
        } : {
          width: '100%',
          backgroundColor: "var(--paper)",
          minHeight: "100vh",
          height: "auto",
          overflow: "visible",
          transform: "none",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
