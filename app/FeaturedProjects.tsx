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
    result: "Jewellery Shined on Feed! ✨", 
    logo: "/logos/Shri radhey Krishna  jewellers.JPG", 
    href: brandLinks.shriRadheyKrishnaJewellers,
    glowColor: "rgba(212, 175, 55, 0.8)",
    shadowGlow: "rgba(212, 175, 55, 0.22)",
    highlights: ["⚡ Luxury Reel Branding", "📈 High-End Video Reach", "💎 Premium Positioning"]
  },
  { 
    src: "/videos-optimized/MOTO MANIA.mp4", 
    poster: "/Cover pages/Fof fitness.png", 
    name: "FOF Fitnesa", 
    result: "High-Energy Gym Loops! 💪", 
    logo: "/logos/FOF Fitnesa logo.jpeg", 
    href: brandLinks.fofFitnesa,
    glowColor: "rgba(0, 242, 254, 0.8)",
    shadowGlow: "rgba(0, 242, 254, 0.22)",
    highlights: ["⚡ Hardcore Beast Mode", "📈 Gym Culture & Buzz", "🔥 Audio Engineering On Fire"]
  },
  { 
    src: "/videos-optimized/Global 2 (1).mp4", 
    poster: "/Cover pages/Global Holidays.png", 
    name: "Global Holidays", 
    result: "Travel Loops That Worked! ✈️", 
    logo: "/logos/Global Holidays.PNG", 
    href: brandLinks.globalHolidays,
    glowColor: "rgba(255, 107, 107, 0.8)",
    shadowGlow: "rgba(255, 107, 107, 0.22)",
    highlights: ["⚡ Wanderlust Vibe Loops", "📈 Travel Inquiries Generated", "🌍 High-Retention Hook"]
  },
  { 
    src: "/videos-optimized/VDMC.mp4", 
    poster: "/Cover pages/Vdmc.PNG", 
    name: "VDMC", 
    result: "Mouth-Watering Chaap Reels! 🍽️", 
    logo: "/logos/Vdmc logo.JPG", 
    href: brandLinks.vdmc,
    glowColor: "rgba(239, 68, 68, 0.8)",
    shadowGlow: "rgba(239, 68, 68, 0.22)",
    highlights: ["⚡ Food Porn Hooks", "📈 Swag-Packed Cuts", "🍔 Zomato Orders Elevated"]
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
  const [isHovered, setIsHovered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const isPlaying = activePlayingIndex === i;
  const isMounted = isPlaying || isHovered;

  useEffect(() => {
    if (!isMounted) {
      setIsReady(false);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && isReady && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Play failed", e));
    }
  }, [isMounted, isReady]);

  const handleMouseEnter = () => {
    if (hasTouched) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hasTouched) return;
    setIsHovered(false);
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

  const isLeft = i % 2 === 0;

  return (
    <motion.a
      className="workCard"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name} on Instagram`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      initial={{ opacity: 0, scale: 0.85, x: isLeft ? -120 : 120, y: 0 }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ type: "spring", damping: 60, stiffness: 500, mass: 1, delay: i * 0.15 }}
      transformTemplate={(transform, generatedTransform) => `perspective(1200px) ${generatedTransform}`}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background/Placeholder image */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        className="workCardMedia"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {isMounted && (
        <video 
          ref={videoRef} 
          src={src} 
          poster={poster} 
          loop 
          muted 
          autoPlay
          playsInline 
          preload="metadata"
          className="workCardMedia" 
          onPlaying={() => setIsReady(true)}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2
          }} 
        />
      )}

      <div className="cardInfo" style={{ zIndex: 3 }}>
        <div className="cardInfoLogoWrapper">
          <img 
            src={logo} 
            alt="" 
            loading="lazy"
          />
        </div>
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsReady(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && isReady && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Mobile video play failed", e));
    }
  }, [isActive, isReady]);

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
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background/Placeholder image */}
      <img
        src={poster}
        alt=""
        loading="lazy"
        className="mobileProjectCardMedia"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {isActive && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className="mobileProjectCardMedia"
          onPlaying={() => setIsReady(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2
          }}
        />
      )}

      {/* Floating Cascade Frosted Highlight Tags */}
      <AnimatePresence>
        {showHighlights && (
          <div className="mobileProjectHighlights" style={{ zIndex: 12 }}>
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

      <div className="mobileProjectCardInfo" style={{ zIndex: 10 }}>
        <div className="mobileProjectCardLogoAndTitle">
          <div className="mobileProjectCardLogoWrapper">
            <img
              src={logo}
              alt=""
              loading="lazy"
              className="mobileProjectCardLogo"
            />
          </div>
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

  const leftColProjects = projects.filter((_, idx) => idx % 2 === 0);
  const rightColProjects = projects.filter((_, idx) => idx % 2 !== 0);

  return (
    <section className="section" id="work" style={{ paddingTop: '160px' }}>
      <div className="sectionHead">
        <p className="eyebrow">featured projects</p>
        <h2>Work We're <br /> Proud Of</h2>
      </div>

      <div className="workGrid">
        <div className="workColumn left">
          {leftColProjects.map((project) => {
            const originalIndex = projects.indexOf(project);
            return (
              <WorkCard
                key={project.name}
                src={project.src}
                poster={project.poster}
                name={project.name}
                result={project.result}
                logo={project.logo}
                href={project.href}
                i={originalIndex}
                activePlayingIndex={activePlayingIndex}
                setActivePlayingIndex={setActivePlayingIndex}
              />
            );
          })}
        </div>
        <div className="workColumn right">
          {rightColProjects.map((project) => {
            const originalIndex = projects.indexOf(project);
            return (
              <WorkCard
                key={project.name}
                src={project.src}
                poster={project.poster}
                name={project.name}
                result={project.result}
                logo={project.logo}
                href={project.href}
                i={originalIndex}
                activePlayingIndex={activePlayingIndex}
                setActivePlayingIndex={setActivePlayingIndex}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
