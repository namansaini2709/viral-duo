"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import ShiftButton from "../ShiftButton";
import Navbar from "../Navbar";

// High-fidelity image assets for the 3D gallery
const galleryImages = [
  "/product_photoshoot_showcase.png",
  "/Dot_Key/Product Photoshoot/IMG_4745.jpg",
  "/Dot_Key/Product Photoshoot/IMG_4776.jpg",
  "/Dot_Key/Product Photoshoot/IMG_4798.jpg",
  "/Dot_Key/Product Photoshoot/IMG_4855.PNG",
  "/img1.jpeg",
  "/img2.jpeg"
];


export default function PhotoshootsPage() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // States to control continuous rotation angle
  const [rotationRow1, setRotationRow1] = useState(0);
  const [rotationRow2, setRotationRow2] = useState(0);

  // Hover states to pause rotation for specific rows
  const [isHoveredRow1, setIsHoveredRow1] = useState(false);
  const [isHoveredRow2, setIsHoveredRow2] = useState(false);

  // Responsive settings
  const [radius, setRadius] = useState(380);
  const [cardWidth, setCardWidth] = useState(180);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(240);
        setCardWidth(110);
      } else if (window.innerWidth < 1024) {
        setRadius(320);
        setCardWidth(150);
      } else {
        setRadius(420);
        setCardWidth(200);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update rotation angles on each frame (independent of frame rates)
  useAnimationFrame((time, delta) => {
    const speed = 0.015 * (delta / 16.67); // Normalized speed
    if (!isHoveredRow1) {
      setRotationRow1((prev) => (prev + speed * 12) % 360);
    }
    if (!isHoveredRow2) {
      setRotationRow2((prev) => (prev - speed * 12) % 360);
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

  const cardHeight = cardWidth * 1.35;

  const imageSchema = {
    "@context": "https://schema.org",
    "@graph": galleryImages.map((src, idx) => ({
      "@type": "ImageObject",
      "name": `The Viral Duo Commercial Product Photoshoot ${idx + 1}`,
      "description": "High-end product photography staging showcase by The Viral Duo.",
      "contentUrl": `https://theviralduo.com${src}`,
      "thumbnailUrl": `https://theviralduo.com${src}`
    }))
  };

  return (
    <main 
      className="aboutPage" 
      style={{ 
        overflowX: "hidden", 
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
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
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          style={{ 
            display: "inline-block", 
            fontSize: "11px", 
            fontWeight: "700", 
            letterSpacing: "0.25em", 
            textTransform: "uppercase", 
            color: "var(--muted)",
            marginBottom: "12px"
          }}
        >
          Timeless Imagery
        </motion.span>
        
        <div style={{ overflow: "hidden", paddingBottom: "12px", marginBottom: "-12px" }}>
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
              lineHeight: "1.2", 
              color: "var(--ink)",
              margin: 0,
              paddingBottom: "4px"
            }}
          >
            Capturing Moments, Crafting Stories
          </motion.h1>
        </div>
      </section>

      {/* 3D Cylindrical Gallery Showcase Container */}
      <section 
        style={{ 
          position: "relative", 
          width: "100%", 
          height: "680px", 
          marginTop: "40px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          overflow: "visible",
          perspective: "1200px"
        }}
      >
        {/* ROW 1: Tilted slightly downwards, clockwise rotation */}
        <div 
          onMouseEnter={() => setIsHoveredRow1(true)}
          onMouseLeave={() => setIsHoveredRow1(false)}
          style={{
            position: "absolute",
            top: "14%",
            width: "100%",
            height: `${cardHeight}px`,
            transformStyle: "preserve-3d",
            transform: "rotateX(-8deg)", // Tilt down
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none"
          }}
        >
          <div 
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotationRow1}deg)`
            }}
          >
            {galleryImages.map((src, i) => {
              const angle = i * (360 / galleryImages.length);
              return (
                <div
                  key={`row1-${i}`}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    marginLeft: `-${cardWidth / 2}px`,
                    marginTop: `-${cardHeight / 2}px`,
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    pointerEvents: "auto",
                    transition: "filter 0.5s ease, opacity 0.5s ease"
                  }}
                  className="cylinderCard"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, zIndex: 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1.5px solid var(--line)",
                      boxShadow: "0 20px 40px rgba(11, 11, 10, 0.06)",
                      cursor: "pointer",
                      background: "var(--card)"
                    }}
                  >
                    <img 
                      src={src} 
                      alt={`The Viral Duo Commercial Product Photoshoot Carousel Item ${i + 1}`}
                      loading="eager"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        filter: "grayscale(100%) contrast(1.1)",
                        transition: "filter 0.4s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = "grayscale(0%) contrast(1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = "grayscale(100%) contrast(1.1)";
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Tilted slightly upwards, counter-clockwise rotation */}
        <div 
          onMouseEnter={() => setIsHoveredRow2(true)}
          onMouseLeave={() => setIsHoveredRow2(false)}
          style={{
            position: "absolute",
            bottom: "14%",
            width: "100%",
            height: `${cardHeight}px`,
            transformStyle: "preserve-3d",
            transform: "rotateX(8deg)", // Tilt up
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none"
          }}
        >
          <div 
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotationRow2}deg)`
            }}
          >
            {galleryImages.map((src, i) => {
              const angle = i * (360 / galleryImages.length);
              return (
                <div
                  key={`row2-${i}`}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    marginLeft: `-${cardWidth / 2}px`,
                    marginTop: `-${cardHeight / 2}px`,
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    pointerEvents: "auto",
                    transition: "filter 0.5s ease, opacity 0.5s ease"
                  }}
                  className="cylinderCard"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, zIndex: 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1.5px solid var(--line)",
                      boxShadow: "0 20px 40px rgba(11, 11, 10, 0.06)",
                      cursor: "pointer",
                      background: "var(--card)"
                    }}
                  >
                    <img 
                      src={src} 
                      alt={`The Viral Duo Commercial Product Photoshoot Carousel Item ${i + 1}`}
                      loading="eager"
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        filter: "grayscale(100%) contrast(1.1)",
                        transition: "filter 0.4s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = "grayscale(0%) contrast(1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = "grayscale(100%) contrast(1.1)";
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Description & Detail Breakdown Section */}
      <section className="aboutVision" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="visionContent">
          <motion.div 
            className="visionText"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: 1 }}
          >
            <span className="pill pink">
              Studio Staging
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--ink)" }}>Commercial Staging & Light Staging</h2>
            <p style={{ color: "var(--muted)" }}>
              In commercial photography, details are everything. We blend natural props with luxury stone textures, soft lighting diffusions, and advanced color correction to establish premium credibility for your physical products.
            </p>
            
            <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { title: "High-End Lighting Setups", desc: "Studio diffusers and bounce boards shape soft reflections and dramatic highlights." },
                { title: "Dynamic Set Construction", desc: "Texture blocks (travertine, granite, slate) match your cosmetics or apparel colors." },
                { title: "E-Commerce Sizing Optimization", desc: "All shots are rendered and exported in multiple aspect ratios (1:1, 4:5, 16:9)." }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ background: "#ffa8f2", color: "#000", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", flexShrink: 0 }}>✓</span>
                  <div>
                    <h4 style={{ fontSize: "18px", fontWeight: "700", color: "var(--ink)" }}>{item.title}</h4>
                    <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "4px", lineHeight: "1.4" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="visionImage"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, mass: 0.8 }}
            style={{ paddingTop: "0px", gridColumn: 2, gridRow: 1 }}
          >
            <div style={{ position: "relative", borderRadius: "32px", overflow: "hidden", border: "1px solid var(--line)" }}>
              <img 
                src="/product_photoshoot_showcase.png" 
                alt="Premium studio photoshoot setup" 
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
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
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", marginBottom: "48px" }}>Let's build your brand portfolio.</h2>
          <ShiftButton dark large dataCalLink="theviralduo/15min" dataCalConfig='{"layout":"month_view"}' leftIconColor="#A78BFA" rightIconColor="#F472B6">
            Book a Call
          </ShiftButton>
        </motion.div>
      </section>
    </main>
  );
}
