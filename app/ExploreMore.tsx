import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useInView } from 'framer-motion';

function ArcCardVideo({ src, isPlaying, poster }: { src: string; isPlaying: boolean; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setIsReady(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && isReady && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isPlaying, isReady]);

  if (!isPlaying) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted
      autoPlay
      playsInline
      preload="metadata"
      onPlaying={() => setIsReady(true)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 'inherit',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.4s ease',
        willChange: 'opacity',
        pointerEvents: 'none'
      }}
    />
  );
}

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

export default function ExploreMore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hoveredIndexRef = useRef<number | null>(null);
  const scalesRef = useRef<number[]>([]);
  const scrollXRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // We check if the section is in view to pause the animation and videos when not visible, saving CPU/battery.
  const isInView = useInView(sectionRef, { once: false, margin: "200px" });

  const items = [
    { name: "Anytime Fitness", src: "/videos-optimized/Anytime fitness.mp4", poster: "/logos/anytime. fitness logos.JPG", href: brandLinks.anytimeFitness },
    { name: "Saral Gym", src: "/videos-optimized/Saral gym.mp4", poster: "/logos/saral gym logo.jpg", href: brandLinks.saral },
    { name: "Global Holidays", src: "/videos-optimized/global 3.mp4", poster: "/logos/Global Holidays.PNG", href: brandLinks.globalHolidays },
    { name: "Make Your Trip Possible", src: "/videos-optimized/makeyourtrips.mp4", poster: "/logos/Make your trip possible.jpg", href: brandLinks.makeYourTripPossible },
    { name: "Sharma Ke Bhature", src: "/videos-optimized/Sharma ji ke bhature.mp4", poster: "/logos/Sharma ji ke bhature.JPG", href: brandLinks.sharmaKeBhature }
  ];

  // Three loops keep the marquee full while cutting per-frame transform work.
  const totalCards = 15;
  const cardWidth = isMobile ? 260 : 360; // 260px on mobile/tablet to be slightly smaller as requested
  const gap = isMobile ? 20 : 32;
  const step = cardWidth + gap;
  const loopWidth = items.length * step;
  
  // Set a constant speed of 72 pixels per second (independent of framerate)
  const speedPxPerSecond = 72; 
  const speedPxPerMs = speedPxPerSecond / 1000; // 0.072px/ms

  const [playingStates, setPlayingStates] = useState<boolean[]>(() =>
    new Array(totalCards).fill(false)
  );

  const playingStatesRef = useRef(playingStates);
  playingStatesRef.current = playingStates;

  // Initialize scales array
  if (scalesRef.current.length === 0) {
    scalesRef.current = new Array(totalCards).fill(0.9);
  }

  useAnimationFrame((time, delta) => {
    if (!isInView || !trackRef.current) return;

    // Cap delta at 32ms (roughly 30fps minimum) to prevent large jumps on frame drops or tab sleep wakeups
    const safeDelta = Math.min(delta, 32);

    // 1. Update the horizontal scroll position using elapsed time (framerate-independent physics)
    scrollXRef.current += speedPxPerMs * safeDelta;
    if (scrollXRef.current >= loopWidth) {
      scrollXRef.current -= loopWidth; // Seamless wrap-around
    }

    // Apply the translation to the track
    trackRef.current.style.transform = `translate3d(${scrollXRef.current}px, 0px, 0px)`;

    const windowWidth = window.innerWidth;
    const playThreshold = windowWidth * 0.22;
    
    const centerOffset = Math.floor(totalCards / 2) * step;

    const nextPlayingStates: boolean[] = [];
    let stateChanged = false;

    // 2. Batch all writes to the DOM to prevent layout thrashing and maintain 120fps smoothness
    for (let i = 0; i < totalCards; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      // Pure mathematical screen center distance calculation with ZERO DOM reads!
      const distanceFromCenter = scrollXRef.current + i * step - centerOffset;
      const absDist = Math.abs(distanceFromCenter);

      const radius = 1000;
      const absDistance = Math.min(absDist, radius);

      // Wheel curved coordinate calculations
      const y = radius - Math.sqrt(Math.pow(radius, 2) - Math.pow(absDistance, 2));
      const angle = (distanceFromCenter / radius) * (180 / Math.PI);

      // Framer-rate independent exponential interpolation for the scale hover effect
      // Target rate: 15% per 16.67ms frame
      const targetScale = hoveredIndexRef.current === i ? 1.0 : 0.9;
      const currentScale = scalesRef.current[i] || 0.9;
      const lerpFactor = 1 - Math.pow(1 - 0.15, safeDelta / 16.67);
      const nextScale = currentScale + (targetScale - currentScale) * lerpFactor;
      scalesRef.current[i] = nextScale;

      // Set scale, z-index, rotation and curved vertical offset directly in a single write operation
      cardEl.style.zIndex = hoveredIndexRef.current === i ? '20' : '1';
      cardEl.style.transform = `translate3d(0px, ${y}px, 0px) rotate(${angle}deg) scale(${nextScale})`;

      const shouldPlay = absDist < playThreshold;

      if ((playingStatesRef.current[i] || false) !== shouldPlay) {
        stateChanged = true;
      }
      nextPlayingStates.push(shouldPlay);
    }

    if (stateChanged) {
      setPlayingStates(nextPlayingStates);
    }
  });

  // Keep playing videos paused when the section is not in view to preserve device battery
  useEffect(() => {
    if (!isInView) {
      setPlayingStates(new Array(totalCards).fill(false));
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="seeMoreSection">
      <div className="sectionHead">
        <p className="eyebrow">Work Gallery</p>
        <h2>Explore More</h2>
      </div>

      <div className="arcGallery">
        <div
          ref={trackRef}
          className="arcMarquee"
          style={{ display: 'flex', gap: `${gap}px` }}
        >
          {[...Array(totalCards)].map((_, i) => {
            const item = items[i % items.length];
            const isPlaying = playingStates[i] || false;
            return (
              <a
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="arcCard"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.name} on Instagram`}
                onMouseEnter={() => { hoveredIndexRef.current = i; }}
                onMouseLeave={() => { hoveredIndexRef.current = null; }}
                style={{
                  willChange: 'transform',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  width: `${cardWidth}px`,
                  height: isMobile ? '160px' : '220px',
                  borderRadius: isMobile ? '24px' : '40px',
                }}
              >
                {/* Background Layer: Static Thumbnail Logo */}
                {item.poster && (
                  <img
                    src={item.poster}
                    alt=""
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'inherit'
                    }}
                  />
                )}
                {/* Foreground Layer: Videos mount dynamically, only center cards play. */}
                <ArcCardVideo src={item.src} isPlaying={isPlaying} poster={item.poster} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="seeMoreContent">
        <motion.a 
          href="https://www.instagram.com/theviralduo/?hl=en" 
          target="_blank"
          rel="noopener noreferrer"
          className="seeMoreRow"
          initial="initial"
          whileHover="hover"
          viewport={{ once: true }}
        >
          <div className="seeMoreArrowWrap">
            <motion.div 
              className="seeMoreBtn purple"
              variants={{
                initial: { scale: 0.8, x: -20, opacity: 0 },
                hover: { scale: 1.1, x: 0, opacity: 1 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.svg 
                variants={{
                  initial: { rotate: 360, scale: 0.5 },
                  hover: { rotate: 0, scale: 1 }
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                width={32} 
                height={32} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </motion.svg>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, x: -20, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            variants={{
              hover: { 
                scale: 1.05,
                rotate: 4,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }
            }}
          >
            See More Works
          </motion.h2>

          <div className="seeMoreArrowWrap">
            <motion.div 
              className="seeMoreBtn pink"
              variants={{
                initial: { scale: 1, x: 0, opacity: 1 },
                hover: { scale: 0.8, x: 20, opacity: 0 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.svg 
                variants={{
                  initial: { rotate: 0, scale: 1 },
                  hover: { rotate: 360, scale: 0.5 }
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                width={32} 
                height={32} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </motion.svg>
            </motion.div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
