import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useInView } from 'framer-motion';
import { img } from './data';

function ArcCard({ src, poster }: { src: string, poster?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rotation, setRotation] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [scale, setScale] = useState(1);

  const isInView = useInView(ref, { once: false, margin: "100px" });

  useAnimationFrame(() => {
    if (!isInView) {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
      return;
    }
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const cardCenterX = rect.left + rect.width / 2;
      const distanceFromCenter = cardCenterX - centerX;

      const radius = 1000;
      const absDistance = Math.min(Math.abs(distanceFromCenter), radius);

      const y = radius - Math.sqrt(Math.pow(radius, 2) - Math.pow(absDistance, 2));
      setYOffset(y * 1.0);

      const angle = (distanceFromCenter / radius) * (180 / Math.PI);
      setRotation(angle);

      setScale(0.9);

      // Play video if near center, pause otherwise
      if (videoRef.current) {
        if (Math.abs(distanceFromCenter) < window.innerWidth * 0.2) {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (!videoRef.current.paused) {
            videoRef.current.pause();
            videoRef.current.load();
          }
        }
      }
    }
  });

  return (
    <motion.div
      ref={ref}
      className="arcCard"
      style={{
        rotate: rotation,
        y: yOffset,
        scale: scale,
        zIndex: 1
      }}
      whileHover={{ scale: scale + 0.1, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <video ref={videoRef} src={src} poster={poster} loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
    </motion.div>
  );
}

export default function ExploreMore() {
  return (
    <section className="seeMoreSection">
      <div className="sectionHead">
        <p className="eyebrow">Work Gallery</p>
        <h2>Explore More</h2>
      </div>

      <div className="arcGallery">
        <motion.div
          className="arcMarquee"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ display: 'flex', gap: '32px' }}
        >
          {[...Array(15)].map((_, i) => {
            const items = [
              { src: "/videos-optimized/Anytime fitness.mp4", poster: "/logos/anytime. fitness logos.JPG" },
              { src: "/videos-optimized/Saral gym.mp4", poster: "/logos/saral gym logo.jpg" },
              { src: "/videos-optimized/global 3.mp4", poster: "/logos/Global Holidays.PNG" },
              { src: "/videos-optimized/makeyourtrips.mp4", poster: "/logos/Make your trip possible.jpg" },
              { src: "/videos-optimized/Sharma ji ke bhature.mp4", poster: "/logos/Sharma ji ke bhature.JPG" }
            ];
            const item = items[i % items.length];
            return <ArcCard key={i} src={item.src} poster={item.poster} />;
          })}
        </motion.div>
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
