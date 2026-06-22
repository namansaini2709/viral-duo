"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathRef = React.useRef(pathname);
  const [isAnimating, setIsAnimating] = useState(true);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getSavedScroll = () => {
    if (typeof window === "undefined") return 0;
    const saved = sessionStorage.getItem(`scroll_pos_${pathRef.current}`);
    if (saved) return parseInt(saved, 10);
    return 0;
  };

  const savedScrollY = getSavedScroll();

  // Restore scroll position immediately when component mounts
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash) {
      return;
    }

    const savedScroll = sessionStorage.getItem(`scroll_pos_${pathRef.current}`);
    if (savedScroll) {
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, parseInt(savedScroll, 10));
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    } else {
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }
  }, []);

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
  }, []);

  const isUserScrolling = React.useRef(false);

  // Monitor user interaction inputs to distinguish human scrolling from router programmatic scrolls
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let activeTimeout: NodeJS.Timeout;
    const setUserScrollingTrue = () => {
      isUserScrolling.current = true;
    };
    const setUserScrollingFalse = () => {
      isUserScrolling.current = false;
    };
    
    // For wheel scrolls, we clear after a short delay since wheel has no end event
    const handleWheel = () => {
      isUserScrolling.current = true;
      clearTimeout(activeTimeout);
      activeTimeout = setTimeout(() => {
        isUserScrolling.current = false;
      }, 300);
    };

    // For scroll-controlling keyboard keys
    const handleKeydown = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"];
      if (keys.includes(e.code)) {
        isUserScrolling.current = true;
        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
          isUserScrolling.current = false;
        }, 300);
      }
    };

    window.addEventListener("pointerdown", setUserScrollingTrue, { passive: true });
    window.addEventListener("pointerup", setUserScrollingFalse, { passive: true });
    window.addEventListener("touchstart", setUserScrollingTrue, { passive: true });
    window.addEventListener("touchend", setUserScrollingFalse, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeydown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", setUserScrollingTrue);
      window.removeEventListener("pointerup", setUserScrollingFalse);
      window.removeEventListener("touchstart", setUserScrollingTrue);
      window.removeEventListener("touchend", setUserScrollingFalse);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeydown);
      clearTimeout(activeTimeout);
    };
  }, []);

  // Save scroll position ONLY when scroll is user-initiated (ignores programmatic scroll-to-top)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isUserScrolling.current && !isAnimating && !(window as any).__pageTransitionActive) {
        sessionStorage.setItem(`scroll_pos_${pathRef.current}`, window.scrollY.toString());
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAnimating]);

  // Restore scroll position or handle hash scrolling once transition has finished
  React.useEffect(() => {
    if (!isAnimating && typeof window !== "undefined") {
      // 1. If there's a hash in the URL, scroll to that element
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // 2. Otherwise, restore the saved scroll position for this page
      const savedScroll = sessionStorage.getItem(`scroll_pos_${pathRef.current}`);
      if (savedScroll) {
        // Temporarily disable global smooth scroll for an instant snap/jump
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        
        window.scrollTo(0, parseInt(savedScroll, 10));
        
        // Re-enable scroll behavior after restoration
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = originalScrollBehavior;
        }, 50);
      }
    }
  }, [isAnimating]);

  return (
    <motion.div
      key={pathRef.current}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: "100%",
        perspective: isAnimating ? "2000px" : "none",
        perspectiveOrigin: isAnimating && mounted
          ? `50% ${savedScrollY + window.innerHeight / 2}px`
          : "50% 50%",
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
          transformOrigin: mounted
            ? `left ${savedScrollY + window.innerHeight}px`
            : "left bottom",
          backfaceVisibility: "hidden",
          backgroundColor: "#f8fafc", // Match page background during rotation
          minHeight: "100vh",
          overflow: "visible",
        } : {
          width: '100%',
          backgroundColor: "#f8fafc",
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
