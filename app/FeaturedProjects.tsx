"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const brandLinks = {
  anytimeFitness: "https://www.instagram.com/anytimefitnessshahdaradelhi/?hl=en",
  vdmc: "https://www.instagram.com/vdmc_malai_chaap_nsfood/?hl=en",
  makeYourTripPossible: "https://www.instagram.com/makeyourtrippossible/?hl=en",
  fofFitnesa: "https://www.instagram.com/foffitnesa/?hl=en",
  sharmaKeBhature: "https://www.instagram.com/sharma_ke_bhature/?hl=en",
  shriRadheyKrishnaJewellers: "https://www.instagram.com/shri_radheykrishnajewellers/?hl=en",
  globalHolidays: "https://www.instagram.com/globalholidays78/?hl=en",
  cityGym: "https://www.instagram.com/citygym.16/?hl=en",
  saral: "https://www.instagram.com/_saralgym_/?hl=en",
  careerLauncher: "https://www.instagram.com/cl_ashokvihar/?hl=en",
};

const projects = [
  { 
    src: "/videos-optimized/shreeradhey.mp4", 
    poster: "/Cover pages/Shri Radhey Krishna Cover.PNG", 
    name: "Shri Radhey Krishna Jewellers", 
    result: "+112% Sales Growth", 
    logo: "/logos/Shri radhey Krishna  jewellers.JPG", 
    href: brandLinks.shriRadheyKrishnaJewellers,
    glowColor: "rgba(212, 175, 55, 0.8)",
    shadowGlow: "rgba(212, 175, 55, 0.22)",
    highlights: ["⚡ Luxury Reel Branding", "📈 +112% Sales Lift", "💎 Elite Positioning"]
  },
  { 
    src: "/videos-optimized/MOTO MANIA.mp4", 
    poster: "/Cover pages/Fof fitness.png", 
    name: "FOF Fitnesa", 
    result: "+154% Member Growth", 
    logo: "/logos/FOF Fitnesa logo.jpeg", 
    href: brandLinks.fofFitnesa,
    glowColor: "rgba(0, 242, 254, 0.8)",
    shadowGlow: "rgba(0, 242, 254, 0.22)",
    highlights: ["⚡ High-Tempo Editing", "📈 +154% Sign-ups", "🔥 Audio Engineering"]
  },
  { 
    src: "/videos-optimized/Global 2 (1).mp4", 
    poster: "/Cover pages/Global Holidays.png", 
    name: "Global Holidays", 
    result: "+84% Booking Growth", 
    logo: "/logos/Global Holidays.PNG", 
    href: brandLinks.globalHolidays,
    glowColor: "rgba(255, 107, 107, 0.8)",
    shadowGlow: "rgba(255, 107, 107, 0.22)",
    highlights: ["⚡ Travel Vibe Loops", "📈 +84% Conversions", "🌍 Global Reach"]
  },
  { 
    src: "/videos-optimized/Career launcher.mp4", 
    poster: "/Cover pages/Career Launcher cover.jpg", 
    name: "Career Launcher", 
    result: "+180% Student Leads", 
    logo: "/logos/carrer launcher.JPG", 
    href: brandLinks.careerLauncher,
    glowColor: "rgba(99, 102, 241, 0.8)",
    shadowGlow: "rgba(99, 102, 241, 0.22)",
    highlights: ["⚡ Storytelling Edits", "📈 +180% Inbound Leads", "🎓 CTR Optimization"]
  },
  { 
    src: "/videos-optimized/VDMC.mp4", 
    poster: "/Cover pages/Vdmc.PNG", 
    name: "VDMC", 
    result: "+220% Daily Orders", 
    logo: "/logos/Vdmc logo.JPG", 
    href: brandLinks.vdmc,
    glowColor: "rgba(239, 68, 68, 0.8)",
    shadowGlow: "rgba(239, 68, 68, 0.22)",
    highlights: ["⚡ Culinary Hooks", "📈 +220% Zomato Orders", "🍔 Content Architecture"]
  }
];

function WorkCard({ 
  src, 
  poster, 
  name, 
  result, 
  logo, 
  href,
  i,
  activePlayingIndex,
  setActivePlayingIndex
}: { 
  src: string; 
  poster: string; 
  name: string; 
  result: string; 
  logo: string; 
  href: string;
  i: number;
  activePlayingIndex: number | null;
  setActivePlayingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTouched, setHasTouched] = useState(false);
  const isPlaying = activePlayingIndex === i;

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.play().catch(e => console.log("Touch play failed", e));
    } else {
      videoRef.current.pause();
      videoRef.current.load(); // Reset to show the cover page poster
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (hasTouched) return;
    videoRef.current?.play().catch(e => console.log("Play failed", e));
  };

  const handleMouseLeave = () => {
    if (hasTouched) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  };

  const handleTouchStart = () => {
    setHasTouched(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasTouched) {
      if (!isPlaying) {
        e.preventDefault(); // Prevent immediate navigation
        setActivePlayingIndex(i); // Play this video, pause and reset all other videos
      }
    }
  };

  return (
    <motion.a
      className={i === 0 ? "workCard wide" : "workCard"}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name} on Instagram`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <video 
        ref={videoRef} 
        src={src} 
        poster={poster} 
        loop 
        muted 
        playsInline 
        className="workCardMedia" 
        style={{ objectPosition: 'top' }} 
        preload="metadata" 
      />
      <div className="cardInfo">
        <img 
          src={logo} 
          alt="" 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            objectFit: 'contain', 
            background: '#fff', 
            padding: '2px',
            marginRight: '8px'
          }} 
        />
        <b>{name}</b>
        <span>/ {result}</span>
        <div className="cardArrow">↗</div>
      </div>
    </motion.a>
  );
}

function MobileProjectCard({
  src,
  poster,
  name,
  result,
  logo,
  href,
  isActive,
  onFocusCard,
  index,
  activeIndex,
  highlights,
  glowColor,
  shadowGlow
}: {
  src: string;
  poster: string;
  name: string;
  result: string;
  logo: string;
  href: string;
  isActive: boolean;
  onFocusCard: () => void;
  index: number;
  activeIndex: number;
  highlights: string[];
  glowColor: string;
  shadowGlow: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHighlights, setShowHighlights] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(e => console.log("Mobile video play failed", e));
    } else {
      videoRef.current.pause();
      videoRef.current.load(); // Reset video to poster frame
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      setShowHighlights(true);
      const timer = setTimeout(() => {
        setShowHighlights(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowHighlights(false);
    }
  }, [isActive]);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isActive) {
      e.preventDefault(); // Block immediate navigation if not active
      onFocusCard(); // Focus this card
    }
  };

  // Determine elegant 3D perspective rotation fanning angles
  const fanAngle = index === activeIndex ? 0 : (index < activeIndex ? -4 : 4);
  const fanY = isActive ? 0 : 8;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mobileProjectCard ${isActive ? 'active' : ''}`}
      onClick={handleCardClick}
      animate={{
        scale: isActive ? 1.0 : 0.90,
        opacity: isActive ? 1.0 : 0.55,
        rotate: fanAngle,
        y: fanY,
        borderColor: isActive ? glowColor : "rgba(11, 11, 10, 0.15)",
        boxShadow: isActive 
          ? `0 14px 34px ${shadowGlow}`
          : "0 4px 20px rgba(0, 0, 0, 0.05)"
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        className="mobileProjectCardMedia"
        style={{ objectPosition: 'top' }}
        preload="metadata"
      />

      {/* Floating Cascade Frosted Highlight Tags */}
      <AnimatePresence>
        {showHighlights && (
          <div className="mobileProjectHighlights">
            {highlights.map((tag, idx) => (
              <motion.span
                key={idx}
                className="mobileHighlightTag"
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.9 }}
                transition={{ 
                  delay: 0.2 + idx * 0.1, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="mobileProjectCardInfo">
        <div className="mobileProjectCardLogoAndTitle">
          <img
            src={logo}
            alt=""
            className="mobileProjectCardLogo"
          />
          <div className="mobileProjectCardText">
            <b>{name}</b>
            <span className="mobileProjectCardMetric">{result}</span>
          </div>
        </div>
        <div className="mobileProjectCardArrow">↗</div>
      </div>
    </motion.a>
  );
}

export default function FeaturedProjects() {
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dragThreshold = 50;
  const handleDragEnd = (event: any, info: any) => {
    const swipe = info.offset.x;
    if (swipe < -dragThreshold && activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (swipe > dragThreshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  if (isMobile) {
    return (
      <section className="section" id="work" style={{ paddingTop: '80px', paddingBottom: '40px', overflow: 'hidden', position: 'relative' }}>
        {/* Dynamic header layout holding title on the left */}
        <div className="featuredProjectsHeader" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sectionHead">
            <p className="eyebrow">featured projects</p>
            <h2>Work We're <br /> Proud Of</h2>
          </div>
        </div>

        <div className="mobileProjectsCarousel" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="mobileProjectsTrack"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{
              paddingLeft: '9vw',
              paddingRight: '9vw',
              gap: '4vw'
            }}
            animate={{
              x: `calc(-${activeIndex} * 86vw)`
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 24
            }}
          >
            {projects.map((project, i) => (
              <MobileProjectCard
                key={project.name}
                src={project.src}
                poster={project.poster}
                name={project.name}
                result={project.result}
                logo={project.logo}
                href={project.href}
                isActive={activeIndex === i}
                onFocusCard={() => setActiveIndex(i)}
                index={i}
                activeIndex={activeIndex}
                highlights={project.highlights}
                glowColor={project.glowColor}
                shadowGlow={project.shadowGlow}
              />
            ))}
          </motion.div>
        </div>

        {/* Clean centered sharp arrow and dot-number-dot pagination controller underneath the cards */}
        <div className="carouselMobileNavWrapper" style={{ position: 'relative', zIndex: 2 }}>
          <div className="carouselNavContainer">
            <button 
              className={`navChevronBtn ${activeIndex === 0 ? 'disabled' : ''}`} 
              onClick={handlePrev}
              aria-label="Previous Project"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="navDotsIndicator">
              {projects.map((project, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={i}
                    className="navIndicatorItem"
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: isActive ? "28px" : "6px",
                      height: "24px",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.span
                          key="num"
                          className="activeNavNumber"
                          style={{
                            color: project.glowColor,
                          }}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="dot"
                          className="inactiveNavDot"
                          style={{
                            backgroundColor: project.glowColor,
                            boxShadow: `0 0 8px ${project.shadowGlow}`
                          }}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.5 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <button 
              className={`navChevronBtn ${activeIndex === projects.length - 1 ? 'disabled' : ''}`} 
              onClick={handleNext}
              aria-label="Next Project"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="work" style={{ paddingTop: '160px' }}>
      <div className="sectionHead">
        <p className="eyebrow">featured projects</p>
        <h2>Work We're <br /> Proud Of</h2>
      </div>

      <div className="workGrid">
        {projects.map((project, i) => (
          <WorkCard
            key={project.name}
            src={project.src}
            poster={project.poster}
            name={project.name}
            result={project.result}
            logo={project.logo}
            href={project.href}
            i={i}
            activePlayingIndex={activePlayingIndex}
            setActivePlayingIndex={setActivePlayingIndex}
          />
        ))}
      </div>
    </section>
  );
}
