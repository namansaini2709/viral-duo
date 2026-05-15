import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { img } from './data';

function ArcCard({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [scale, setScale] = useState(1);

  useAnimationFrame(() => {
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
      <img src={src} alt="Project" />
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
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          style={{ display: 'flex', gap: '32px' }}
        >
          {[...Array(18)].map((_, i) => {
            const images = [img.work1, img.work2, img.work3, img.work4, img.hero, img.phone1];
            const src = images[i % images.length];
            return <ArcCard key={i} src={src} />;
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
