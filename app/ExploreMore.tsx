import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useInView } from 'framer-motion';

function ArcCardVideo({ src, isPlaying }: { src: string; isPlaying: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 'inherit',
        opacity: isPlaying ? 1 : 0,
        transition: 'opacity 0.4s ease',
        willChange: 'opacity',
        pointerEvents: 'none'
      }}
    />
  );
}

export default function ExploreMore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredIndexRef = useRef<number | null>(null);
  const scalesRef = useRef<number[]>([]);
  const scrollXRef = useRef(0);

  // We check if the section is in view to pause the animation and videos when not visible, saving CPU/battery.
  const isInView = useInView(sectionRef, { once: false, margin: "200px" });

  const items = [
    { src: "/videos-optimized/Anytime fitness.mp4", poster: "/logos/anytime. fitness logos.JPG" },
    { src: "/videos-optimized/Saral gym.mp4", poster: "/logos/saral gym logo.jpg" },
    { src: "/videos-optimized/global 3.mp4", poster: "/logos/Global Holidays.PNG" },
    { src: "/videos-optimized/makeyourtrips.mp4", poster: "/logos/Make your trip possible.jpg" },
    { src: "/videos-optimized/Sharma ji ke bhature.mp4", poster: "/logos/Sharma ji ke bhature.JPG" }
  ];

  // Three loops keep the marquee full while cutting per-frame transform work.
  const totalCards = 15;
  const cardWidth = 360;
  const gap = 32;
  const step = cardWidth + gap; // 392px
  const loopWidth = items.length * step; // 5 * 392 = 1960px
  
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
          style={{ display: 'flex', gap: '32px' }}
        >
          {[...Array(totalCards)].map((_, i) => {
            const item = items[i % items.length];
            const isPlaying = playingStates[i] || false;
            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="arcCard"
                onMouseEnter={() => { hoveredIndexRef.current = i; }}
                onMouseLeave={() => { hoveredIndexRef.current = null; }}
                style={{
                  willChange: 'transform',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
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
                {/* Foreground Layer: Videos stay mounted, only center cards play. */}
                <ArcCardVideo src={item.src} isPlaying={isPlaying} />
              </div>
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
                initial: { scale: 0.8, x: -20, opacity: 0, rotate: 0 },
                hover: { scale: 1.1, x: 0, opacity: 1, rotate: 45 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              ↗
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            variants={{
              hover: { scale: 1.05 }
            }}
          >
            See More Works
          </motion.h2>

          <div className="seeMoreArrowWrap">
            <motion.div 
              className="seeMoreBtn pink"
              variants={{
                initial: { scale: 1, x: 0, opacity: 1, rotate: 0 },
                hover: { scale: 0.8, x: 20, opacity: 0, rotate: 45 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              ↗
            </motion.div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
