"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import ShiftButton from "../ShiftButton";
import Navbar from "../Navbar";

const galleryVideos = [
  { src: "/videos-optimized/MOTO MANIA.mp4", poster: "/Cover pages/Fof fitness.png" },
  { src: "/videos-optimized/inderchahal.mp4", poster: "/Cover pages/Anytime fitness.jpg" },
  { src: "/videos-optimized/VDMC.mp4", poster: "/Cover pages/Vdmc.PNG" },
  { src: "/videos-optimized/Anytime fitness.mp4", poster: "/logos/anytime. fitness logos.JPG" },
  { src: "/videos-optimized/Sharma ji ke bhature.mp4", poster: "/logos/Sharma ji ke bhature.JPG" },
  { src: "/videos-optimized/shreeradhey.mp4", poster: "/Cover pages/Shri Radhey Krishna Cover.PNG" },
  { src: "/videos-optimized/global 3.mp4", poster: "/logos/Global Holidays.PNG" },
  { src: "/videos-optimized/makeyourtrips.mp4", poster: "/logos/Make your trip possible.jpg" }
];

export default function EventCoveragePage() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // States to control continuous rotation angle and hover states
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);

  // Responsive settings for the 3D orbiting circular path
  const [radiusX, setRadiusX] = useState(420);
  const [radiusY, setRadiusY] = useState(280);
  const [cardWidth, setCardWidth] = useState(160);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setRadiusX(150);
        setRadiusY(100);
        setCardWidth(85);
        setIsMobile(true);
      } else if (width < 1024) {
        setRadiusX(280);
        setRadiusY(190);
        setCardWidth(125);
        setIsMobile(false);
      } else {
        setRadiusX(420);
        setRadiusY(280);
        setCardWidth(160);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update rotation angle on each frame (independent of frame rates)
  useAnimationFrame((time, delta) => {
    const speed = 0.015 * (delta / 16.67); // Normalized speed
    if (!isHovered) {
      setRotationAngle((prev) => (prev + speed * 12) % 360);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 10);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cardHeight = cardWidth * 1.45; // Aspect ratio matching mobile vertical video reels

  return (
    <main className="aboutPage eventCoveragePage" style={{ overflowX: "hidden", minHeight: "100vh", position: "relative" }}>
      {/* Google Fonts Link injection for Playfair Display serif font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" 
        rel="stylesheet" 
      />

      {/* Subtle paper grain texture overlay */}
      <div 
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 100
        }}
      />

      <Navbar 
        isAtTop={isAtTop} 
        isHidden={isHidden} 
        navTheme="light" 
        isOverFooter={false} 
      />

      {/* Header bar spacing spacer */}
      <div style={{ height: "140px" }} />

      {/* Hero Title Container */}
      <section style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div className="mobilePillWrapper" style={{ justifyContent: "center", display: "flex", marginBottom: "12px" }}>
          <motion.p 
            className="pill pink"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            EVENT COVERAGE
          </motion.p>
        </div>
        
        <div style={{ overflow: "hidden" }}>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            style={{ 
              fontFamily: "'Playfair Display', Georgia, serif", 
              fontSize: "clamp(34px, 5vw, 64px)", 
              fontWeight: "400", 
              letterSpacing: "-0.02em", 
              lineHeight: "1.1", 
              color: "var(--ink)",
              margin: 0
            }}
          >
            High-Energy Coverage That Goes Viral
          </motion.h1>
        </div>

        <motion.p
          style={{ marginTop: '24px', fontSize: '18px', color: 'var(--muted)', maxWidth: '640px', margin: '24px auto 0', lineHeight: '1.6' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We bring high-fidelity video production and real-time social media strategy directly to your events. From college festivals to premium auto shows, we capture the hype and turn it into millions of views.
        </motion.p>
      </section>

      {/* 3D Orbiting Ferris Wheel Showcase Container */}
      <section 
        style={{ 
          position: "relative", 
          width: "100%", 
          height: isMobile ? "480px" : "680px", 
          marginTop: "40px", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          overflow: "visible",
          perspective: "1200px"
        }}
      >
        {/* Central Text Elements matching Pinterest Reference */}
        <div 
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "0px" : "48px",
            pointerEvents: "none",
            zIndex: 50,
            width: "100%",
          }}
        >
          {/* Left Text */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                whiteSpace: "nowrap"
              }}
            >
              Timeless Moments
            </motion.div>
          )}

          {/* Center Text */}
          <div 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span 
              style={{
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "6px"
              }}
            >
              THE VIRAL DUO
            </span>
            <h2 
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(24px, 3.5vw, 42px)",
                fontWeight: "400",
                color: "var(--ink)",
                margin: 0,
                lineHeight: "1.2"
              }}
            >
              Event Gallery
            </h2>
          </div>

          {/* Right Text */}
          {!isMobile && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                whiteSpace: "nowrap"
              }}
            >
              Through Memories
            </motion.div>
          )}
        </div>

        {/* Orbiting Video Cards */}
        <div 
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            pointerEvents: "none"
          }}
        >
          {galleryVideos.map((video, i) => {
            const angleStep = 360 / galleryVideos.length;
            const cardAngle = rotationAngle + i * angleStep;
            const rad = (cardAngle * Math.PI) / 180;
            
            // X and Y coordinates on a tilted 3D orbital path
            const x = radiusX * Math.cos(rad);
            const y = radiusY * Math.sin(rad);
            
            // Depth ranges from -1 (at the top, y > 0) to 1 (at the bottom, y < 0)
            const depth = -Math.sin(rad);
            
            const scale = 1 + depth * 0.22; // ranges from 0.78 to 1.22
            const opacity = 0.4 + 0.6 * (depth + 1) / 2; // ranges from 0.4 to 1.0
            const blur = (1 - depth) * 1.5; // ranges from 0px (front) to 3px (back)
            
            const isCardHovered = hoveredCardIdx === i;

            return (
              <div
                key={`orbit-${i}`}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setHoveredCardIdx(i);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setHoveredCardIdx(null);
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${-y}px, ${depth * 100}px) scale(${isCardHovered ? scale * 1.12 : scale})`,
                  zIndex: isCardHovered ? 9999 : Math.round((depth + 1) * 100),
                  opacity: isCardHovered ? 1 : opacity,
                  filter: isCardHovered ? "none" : `blur(${blur}px)`,
                  transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, filter 0.35s ease",
                  pointerEvents: "auto",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1.5px solid var(--line)",
                    boxShadow: isCardHovered 
                      ? "0 30px 60px rgba(11, 11, 10, 0.16)" 
                      : "0 20px 40px rgba(11, 11, 10, 0.05)",
                    background: "var(--card)",
                    transition: "box-shadow 0.35s ease"
                  }}
                >
                  <video 
                    src={video.src} 
                    poster={video.poster}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      filter: isCardHovered ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.1)",
                      transition: "filter 0.4s ease"
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Case Studies & Metrics Section */}
      <section className="aboutVision" id="events" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="visionContent">
          <motion.div 
            className="visionText"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="pill dark">PROVEN HIGHLIGHTS</span>
            <h2>Millions of Eyes on the Hype</h2>
            <p style={{ color: "var(--muted)" }}>
              Events are fleeting, but the content we create lasts. We focus on scroll-stopping pacing, audio-sync transitions, and trending formats to maximize reach and drive FOMO for your next events.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ background: '#ffa8f2', color: '#000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>✓</span>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: "var(--ink)" }}>Ramanujan College Josh Event</h4>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '4px' }}>Two days of festival coverage. The artist reel crossed **150K+ views** and generated **500K+ overall reach**.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ background: '#ffa8f2', color: '#000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>✓</span>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: "var(--ink)" }}>Bharati College Sufi Night</h4>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '4px' }}>Captured the magic and Sufi night vibe. The event recap reel went completely viral, hitting **2 Million+ views**.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ background: '#ffa8f2', color: '#000', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>✓</span>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: "var(--ink)" }}>FOF Fitness Moto Mania</h4>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '4px' }}>High-octane gym and bike event coverage. Gained **50K+ views** on reels and **250K+ reach** in dashboard analytics.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="visionImage"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, mass: 0.8, delay: 0.1 }}
            style={{ paddingTop: '0px' }}
          >
            {/* Dynamic Metric Display Panels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#ffa8f2', borderRadius: '32px', padding: '40px 32px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
                <strong style={{ display: 'block', fontSize: '72px', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--ink)' }}>2.0M+</strong>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px', opacity: 0.7 }}>Bharati Sufi Night Views</span>
              </div>
              <div style={{ background: '#B4A9FF', borderRadius: '32px', padding: '40px 32px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
                <strong style={{ display: 'block', fontSize: '72px', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--ink)' }}>500K+</strong>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px', opacity: 0.7 }}>Josh Event Reach</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="aboutCTA">
        <motion.div 
          className="ctaContent"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Make your next event go viral!</h2>
          <ShiftButton dark large dataCalLink="theviralduo/15min" dataCalConfig='{"layout":"month_view"}' leftIconColor="#A78BFA" rightIconColor="#F472B6">Book a Call</ShiftButton>
        </motion.div>
      </section>
    </main>
  );
}
