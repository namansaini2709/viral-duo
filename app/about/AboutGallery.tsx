"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const videos = [
  "/videos-optimized/VDMC.mp4",
  "/videos-optimized/Anytime fitness.mp4",
  "/videos-optimized/Sharma ji ke bhature.mp4",
  "/videos-optimized/inderchahal.mp4",
  "/videos-optimized/shreeradhey.mp4",
];

export default function AboutGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for different images
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yTopLeft = useTransform(scrollYProgress, [0, 1], [150, -450]);
  const yTopRight = useTransform(scrollYProgress, [0, 1], [80, -600]);
  const yBottomLeft = useTransform(scrollYProgress, [0, 1], [200, -350]);
  const yBottomRight = useTransform(scrollYProgress, [0, 1], [250, -700]);

  return (
    <section className="aboutGallery" ref={containerRef} id="gallery">
      <div className="galleryContainer">
        <motion.div 
          className="galleryHeader"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="pill dark">WHAT WE’RE HERE TO DO</span>
          <h2>Building content<br />that matters.</h2>
        </motion.div>

        <div className="galleryGrid">
          {/* Top Left */}
          <motion.div 
            className="galleryItem topLeft" 
            style={{ y: yTopLeft }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            <video src={videos[0]} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Top Right */}
          <motion.div 
            className="galleryItem topRight" 
            style={{ y: yTopRight }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <video src={videos[1]} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Center Main */}
          <motion.div 
            className="galleryItem centerMain" 
            style={{ y: yCenter }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <video src={videos[2]} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Bottom Left */}
          <motion.div 
            className="galleryItem bottomLeft" 
            style={{ y: yBottomLeft }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <video src={videos[3]} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          {/* Bottom Right */}
          <motion.div 
            className="galleryItem bottomRight" 
            style={{ y: yBottomRight }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <video src={videos[4]} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
