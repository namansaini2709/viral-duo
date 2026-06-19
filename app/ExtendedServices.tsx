"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ShiftButton from "./ShiftButton";
import LazyVideo from "./LazyVideo";

const slides = [
  {
    id: "photoshoot",
    title: "Studio\nPhotoshoots",
    description: "We design high-end conceptual product shoots that showcase intricate texture, capture attention on feeds, and elevate your brand's visual identity across all digital platforms.",
    projectDetails: "Conceptual product showcases & creative studio photography",
    sunBg: "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.02) 65%, transparent 80%)",
    glowColor: "rgba(212, 175, 55, 0.15)",
    textColor: "#b45309",
    href: "/photoshoots"
  },
  {
    id: "event",
    title: "Event\nCoverage",
    description: "We deploy high-energy content creation crews to capture live event excitement, musical festivals, and auto shows, driving organic reach and lasting social buzz.",
    projectDetails: "Live coverage campaigns & immersive event production highlights",
    sunBg: "radial-gradient(circle, rgba(244, 63, 94, 0.22) 0%, rgba(244, 63, 94, 0.02) 65%, transparent 80%)",
    glowColor: "rgba(244, 63, 94, 0.15)",
    textColor: "#e11d48",
    href: "/event-coverage"
  }
];

export default function ExtendedServices() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use refs to track lock state and timers in listeners to avoid closures issues
  const activeIdxRef = useRef(activeIdx);
  const isLockedRef = useRef(false);
  const lockTimeRef = useRef(0);
  const lastSlideChangeTimeRef = useRef(0);
  const ignoreTouchRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
    lastSlideChangeTimeRef.current = Date.now();
  }, [activeIdx]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Scroll locking, settling, and gesture listening
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const scrollCooldown = 900; // time in ms between slide transitions
    let accumulatedDelta = 0;
    let resetTimeout: NodeJS.Timeout;
    let touchStartX = 0;
    let touchStartY = 0;

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    // Wheel Scroll Hijacking with Settle-and-Lock logic
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return; // Bypass scroll lock on tablet/mobile
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Glimpses section covers the viewport center
      if (!isLockedRef.current) {
        const isCentered = rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2;
        if (!isCentered) {
          return;
        }
      }

      const deltaY = e.deltaY;
      const now = Date.now();

      // Post-transition lock: If a slide transition just happened, always block scroll to let it settle
      const timeSinceChange = now - lastSlideChangeTimeRef.current;
      if (isLockedRef.current && timeSinceChange < 800) {
        e.preventDefault();
        return;
      }

      // Check if we are locking the scroll for the first time on entering the card
      if (!isLockedRef.current) {
        // Lock scroll if user scrolls down on 1st card, or scrolls up on 2nd card
        const canLockDown = deltaY > 0 && activeIdxRef.current === 0;
        const canLockUp = deltaY < 0 && activeIdxRef.current === 1;

        if (canLockDown || canLockUp) {
          isLockedRef.current = true;
          lockTimeRef.current = now;
          container.scrollIntoView({ block: "center" }); // instant snap to center
          e.preventDefault();
          return;
        }
      }

      // If we are already locked
      if (isLockedRef.current) {
        // Scrolling Down
        if (deltaY > 0) {
          if (activeIdxRef.current < slides.length - 1) {
            e.preventDefault(); // lock viewport

            // Settle check: Ignore momentum scrolls that brought the card into view
            const timeSinceLock = now - lockTimeRef.current;
            if (timeSinceLock < 750) return;

            accumulatedDelta += deltaY;
            clearTimeout(resetTimeout);
            resetTimeout = setTimeout(() => {
              accumulatedDelta = 0;
            }, 150);

            // Trigger slide change on deliberate scroll ticks
            if (accumulatedDelta > 120 && now - lastScrollTime > scrollCooldown) {
              setActiveIdx((prev) => prev + 1);
              accumulatedDelta = 0;
              lastScrollTime = now;
            }
          } else {
            // Last slide, release scroll lock so page scrolls down
            isLockedRef.current = false;
          }
        } 
        // Scrolling Up
        else if (deltaY < 0) {
          if (activeIdxRef.current > 0) {
            e.preventDefault();

            const timeSinceLock = now - lockTimeRef.current;
            if (timeSinceLock < 750) return;

            accumulatedDelta += Math.abs(deltaY);
            clearTimeout(resetTimeout);
            resetTimeout = setTimeout(() => {
              accumulatedDelta = 0;
            }, 150);

            if (accumulatedDelta > 120 && now - lastScrollTime > scrollCooldown) {
              setActiveIdx((prev) => prev - 1);
              accumulatedDelta = 0;
              lastScrollTime = now;
            }
          } else {
            // First slide, release scroll lock so page scrolls up
            isLockedRef.current = false;
          }
        }
      }
    };

    // Touch Handling (Mobile Swipes with Global Settle-and-Lock)
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      ignoreTouchRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY; // Positive = swiping up (scrolling down)
      const now = Date.now();

      if (Math.abs(deltaY) < 15) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 1. If not locked, check if card is centered to lock
      if (!isLockedRef.current) {
        const isCentered = rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2;
        if (isCentered) {
          const canLockDown = deltaY > 0 && activeIdxRef.current === 0;
          const canLockUp = deltaY < 0 && activeIdxRef.current === 1;

          if (canLockDown || canLockUp) {
            isLockedRef.current = true;
            lockTimeRef.current = now;
            ignoreTouchRef.current = true; // Ignore further movement of this gesture
            container.scrollIntoView({ behavior: "smooth", block: "center" });
            if (e.cancelable) e.preventDefault();
            return;
          }
        }
      }

      // 2. If locked
      if (isLockedRef.current) {
        if (ignoreTouchRef.current) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        // Swiping Up (Scrolling Down)
        if (deltaY > 0) {
          if (activeIdxRef.current < slides.length - 1) {
            if (e.cancelable) e.preventDefault();
            
            const settleTimeout = 350;
            const swipeThreshold = 45;
            const timeSinceLock = now - lockTimeRef.current;
            if (timeSinceLock < settleTimeout) return;

            if (Math.abs(deltaY) > swipeThreshold && now - lastScrollTime > scrollCooldown) {
              setActiveIdx((prev) => prev + 1);
              lastScrollTime = now;
              touchStartY = touchCurrentY;
              ignoreTouchRef.current = true; // Ignore further movement of this gesture
            }
          } else {
            // End of cards, release lock to scroll down to next section
            isLockedRef.current = false;
          }
        }
        // Swiping Down (Scrolling Up)
        else if (deltaY < 0) {
          if (activeIdxRef.current > 0) {
            if (e.cancelable) e.preventDefault();
            
            const settleTimeout = 350;
            const swipeThreshold = 45;
            const timeSinceLock = now - lockTimeRef.current;
            if (timeSinceLock < settleTimeout) return;

            if (Math.abs(deltaY) > swipeThreshold && now - lastScrollTime > scrollCooldown) {
              setActiveIdx((prev) => prev - 1);
              lastScrollTime = now;
              touchStartY = touchCurrentY;
              ignoreTouchRef.current = true; // Ignore further movement of this gesture
            }
          } else {
            // Start of cards, release lock to scroll up to previous section
            isLockedRef.current = false;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      ignoreTouchRef.current = false;
    };

    const isMobileViewport = window.innerWidth < 1024;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });

    if (!isMobileViewport) {
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      if (!isMobileViewport) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchcancel", handleTouchEnd);
      }
      clearTimeout(resetTimeout);
    };
  }, []);

  const springTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 26,
  };

  const colLeftVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3 } 
    }
  };

  const textItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: springTransition 
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      transition: { duration: 0.25 } 
    }
  };

  return (
    <section className="extendedServicesSection">
      <div ref={containerRef} className="glimpse-card-viewport">
        
        {/* TOP MOCK HEADER */}
        <div className="glimpse-mock-header">
          <div className="glimpse-header-left">
            <span className="glimpse-header-title">The Viral Duo // Glimpses</span>
          </div>
          
          {/* Logo center */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo-v2.png" alt="The Viral Duo" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '50%', border: '1px solid var(--line)', padding: '2px' }} />
          </div>

          <div className="glimpse-header-right">
            <button 
              className="glimpse-all-episodes"
              data-cal-link="theviralduo/15min"
              data-cal-config='{"layout":"month_view"}'
              style={{ background: 'none', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}
            >
              Book a Call
            </button>
            <span className="glimpse-lang">EN</span>
            
            {/* Audio Toggle (Speaker) */}
            <button 
              className="glimpse-audio-btn" 
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Event Clip" : "Mute Event Clip"}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="22" y1="9" x2="16" y2="15"></line>
                  <line x1="16" y1="9" x2="22" y2="15"></line>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* LEFT COLUMN: TITLE & DETAILS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={colLeftVariants}
            className="glimpse-col-left"
          >
            <motion.h3 
              variants={textItemVariants}
              className="glimpse-title"
            >
              {slides[activeIdx].title}
            </motion.h3>
            
            <motion.p 
              variants={textItemVariants}
              className="glimpse-desc"
            >
              {slides[activeIdx].description}
            </motion.p>
            
            <motion.div 
              variants={textItemVariants}
              style={{ marginTop: "12px" }}
            >
              <ShiftButton 
                href={slides[activeIdx].href} 
                dark 
                showIcon={true}
                leftIconColor="#a3e635"
                rightIconColor="#10b981"
              >
                Explore Projects
              </ShiftButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* CENTER STAGE: RINGS, SUN, SUBJECT & PLAY BUTTON */}
        <div className="glimpse-col-center">
          
          {/* Concentric rings backdrop */}
          <div className="glimpse-sun-stage">
            <div className="glimpse-ring-outer">
              <div className="glimpse-ring-mid">
                <div 
                  className="glimpse-sun"
                  style={{
                    background: slides[activeIdx].sunBg,
                    boxShadow: `0 0 100px ${slides[activeIdx].glowColor}`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Ground reflection floor */}
          <div className="glimpse-ground-plane" />

          {/* 3D Visual Subject */}
          <div className="glimpse-subject-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ y: 130, opacity: 0, rotateX: 15, rotateY: -10, scale: 0.82 }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  rotateX: 0, 
                  rotateY: 0, 
                  scale: 1,
                  transition: springTransition
                }}
                exit={{ 
                  y: -130, 
                  opacity: 0, 
                  scale: 0.82, 
                  rotateX: -15,
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", transformStyle: "preserve-3d" }}
              >
                {/* Subject 1: Studio Photoshoots (Overlapping Polaroids) */}
                {activeIdx === 0 && (
                  <motion.div 
                    className="polaroidsStack"
                    animate={{ y: [-7, 7, -7], rotate: [-0.5, 0.5, -0.5] }}
                    transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="polaroidCard pCard1"
                      whileHover={{ scale: 1.05, zIndex: 5, rotate: -15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <img src="/Cover pages/Shri Radhey Krishna Cover.PNG" alt="Luxury Jewelry Shoot" />
                      <div className="polaroidLabel">#luxuryJewelry</div>
                    </motion.div>
                    <motion.div 
                      className="polaroidCard pCard2"
                      whileHover={{ scale: 1.05, zIndex: 5, rotate: 12 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <img src="/product_photoshoot_showcase.png" alt="Cosmetics Shoot" />
                      <div className="polaroidLabel">#cosmeticsShoot</div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Subject 2: Event Coverage (Smartphone video preview) */}
                {activeIdx === 1 && (
                  <motion.div 
                    className="phoneFrame"
                    animate={{ y: [-8, 8, -8], rotate: [0.5, -0.5, 0.5] }}
                    transition={{ repeat: Infinity, duration: 6.8, ease: "easeInOut" }}
                  >
                    <div className="phoneOverlayLive">
                      <span className="phoneLiveDot" />
                      <span>LIVE</span>
                    </div>
                    <div className="phoneOverlayViews">● 2.7M</div>
                    
                    <div className="phoneSoundWave">
                      <div className="phoneWaveBar" />
                      <div className="phoneWaveBar" style={{ animationDelay: "0.2s" }} />
                      <div className="phoneWaveBar" style={{ animationDelay: "0.4s" }} />
                      <div className="phoneWaveBar" style={{ animationDelay: "0.6s" }} />
                    </div>
                    
                    {/* Floating emoji reactions */}
                    <span className="glimpse-floating-reaction" style={{ animationDelay: "0s" }}>❤️</span>
                    <span className="glimpse-floating-reaction" style={{ animationDelay: "0.7s", right: "32px" }}>🔥</span>
                    <span className="glimpse-floating-reaction" style={{ animationDelay: "1.4s", right: "22px" }}>😮</span>
                    <span className="glimpse-floating-reaction" style={{ animationDelay: "2.1s", right: "40px" }}>👍</span>
                    
                    <LazyVideo
                      src="/videos-optimized/MOTO MANIA.mp4"
                      poster="/Cover pages/Fof fitness.png"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>



        </div>

        {/* RIGHT COLUMN: INDEX ODOMETER & SNIPPET */}
        <div className="glimpse-col-right" style={{ justifyContent: "center" }}>
          
          {/* Vertical Odometer Roll (for desktop) / Clickable Pagination (for mobile) */}
          {!isMobile ? (
            <div className="glimpse-odometer-outer">
              <div className="glimpse-odometer-container">
                <motion.div 
                  className="glimpse-odometer-track"
                  animate={{ y: -activeIdx * 40 }}
                  transition={springTransition}
                >
                  <div className="glimpse-odometer-number">01</div>
                  <div className="glimpse-odometer-number">02</div>
                </motion.div>
              </div>
              <div className="glimpse-odometer-separator" />
              <div className="glimpse-odometer-total">02</div>
            </div>
          ) : (
            <div className="glimpse-mobile-pagination">
              <button 
                className={`glimpse-page-btn ${activeIdx === 0 ? "active" : ""}`}
                onClick={() => setActiveIdx(0)}
                aria-label="Show Card 01"
              >
                01
              </button>
              <div className="glimpse-odometer-separator" style={{ margin: "0 6px" }} />
              <button 
                className={`glimpse-page-btn ${activeIdx === 1 ? "active" : ""}`}
                onClick={() => setActiveIdx(1)}
                aria-label="Show Card 02"
              >
                02
              </button>
            </div>
          )}

          {/* Project description snippet */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: springTransition }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
              className="glimpse-project-details"
            >
              {slides[activeIdx].projectDetails}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BOTTOM MOCK FOOTER */}
        <div className="glimpse-mock-footer">
          <div className="glimpse-footer-left">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="glimpse-social-icon" aria-label="Facebook">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="glimpse-social-icon" aria-label="Instagram">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="glimpse-social-icon" aria-label="YouTube">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.515 3.5 12 3.5 12 3.5s-7.512 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.488 20.5 12 20.5 12 20.5s7.515 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <div className="glimpse-footer-right">
            <span>Terms & Conditions  |  Privacy  |  Cookies</span>
          </div>
        </div>

      </div>
    </section>
  );
}
