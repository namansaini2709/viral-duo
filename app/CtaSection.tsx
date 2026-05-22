"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ShiftButton from './ShiftButton';
import LazyVideo from './LazyVideo';

export default function CtaSection() {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  } as const;

  return (
    <section className="cta" id="contact">
      <div className="ctaCard ctaCardDark">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="ctaWavyDecor">
          <motion.path 
            d="M10 50 Q 30 10 50 50 T 90 50" 
            stroke="#fbb6ed" 
            strokeWidth="8" 
            strokeLinecap="round" 
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          />
        </svg>
        <h2>UGC that grows your brand.</h2>
        <p>The Viral Duo helps brands create content that earns attention, builds engagement, and drives real growth.</p>
        <ShiftButton 
          dataCalLink="theviralduo/15min" 
          dataCalConfig='{"layout":"month_view"}'
          light 
          large 
          leftIconColor="#E699FF" 
          rightIconColor="#fbb6ed"
        >
          Book a call
        </ShiftButton>
      </div>

      <div className="ctaCard">
        <LazyVideo
          src="/Ilustrated videos/bottom 2.mp4"
          className="ctaCardImage"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
