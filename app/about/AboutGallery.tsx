"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  "https://framerusercontent.com/images/zcV8VMLW2UaiLm9AJM8MPiwdlw.jpg?width=790&height=936",
  "https://framerusercontent.com/images/o6duUa9OkHlf9DhOgeIlWNcRGY.jpg?width=790&height=936",
  "https://framerusercontent.com/images/Q4PeZp2Qx7rmA1hYjx2r2TeGlQ.jpg?width=790&height=936",
  "https://framerusercontent.com/images/DDCUixRHvKkrC3Ij9VowKTydSFE.jpg?width=790&height=936",
  "https://framerusercontent.com/images/ZsEIaooNaf9TIZjuTEevCpMqEe8.jpg?width=790&height=936",
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
            <img src={images[0]} alt="Gallery 1" />
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
            <img src={images[1]} alt="Gallery 2" />
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
            <img src={images[2]} alt="Gallery Main" />
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
            <img src={images[3]} alt="Gallery 3" />
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
            <img src={images[4]} alt="Gallery 4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
