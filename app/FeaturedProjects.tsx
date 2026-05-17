"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function WorkCard({ src, poster, name, result, logo, i }: { src: string, poster: string, name: string, result: string, logo: string, i: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (isTouch) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (deviceType !== 'tablet') return;

    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(e => console.log("Play failed on tablet", e));
          } else {
            el.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.05
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [deviceType]);

  const handleMouseEnter = () => {
    if (deviceType !== 'desktop') return;
    videoRef.current?.play().catch(e => console.log("Play failed on desktop", e));
  };

  const handleMouseLeave = () => {
    if (deviceType !== 'desktop') return;
    if (videoRef.current) {
      videoRef.current.pause();
      // Reset the video so the poster thumbnail shows again
      videoRef.current.load();
    }
  };

  return (
    <motion.a
      className={i === 0 ? "workCard wide" : "workCard"}
      href="/#work"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <video ref={videoRef} src={src} poster={poster} loop muted playsInline className="workCardMedia" style={{ objectPosition: 'top' }} preload="metadata" />
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

export default function FeaturedProjects() {
  return (
    <section className="section" id="work" style={{ paddingTop: '160px' }}>
      <div className="sectionHead">
        <p className="eyebrow">featured projects</p>
        <h2>Work We're <br /> Proud Of</h2>
      </div>

      <div className="workGrid">
        {[
          ["/videos-optimized/shreeradhey.mp4", "/Cover pages/Shri Radhey Krishna Cover.PNG", "Shri Radhey Krishna Jewellers", "100% Sales growth", "/logos/Shri radhey Krishna  jewellers.JPG"],
          ["/videos-optimized/MOTO MANIA.mp4", "/Cover pages/Fof fitness.png", "FOF Fitnesa", "150% Member growth", "/logos/FOF Fitnesa logo.jpeg"],
          ["/videos-optimized/Global 2 (1).mp4", "/Cover pages/Global Holidays.png", "Global Holidays", "+75% Booking Rate", "/logos/Global Holidays.PNG"],
          ["/videos-optimized/Career launcher.mp4", "/Cover pages/Career Launcher cover.jpg", "Career Launcher", "2x Student Leads", "/logos/carrer launcher.JPG"],
          ["/videos-optimized/VDMC.mp4", "/Cover pages/Vdmc.PNG", "VDMC", "3x Increase in Daily Orders", "/logos/Vdmc logo.JPG"]
        ].map(([src, poster, name, result, logo], i) => (
          <WorkCard
            key={name}
            src={src}
            poster={poster}
            name={name}
            result={result}
            logo={logo}
            i={i}
          />
        ))}
      </div>
    </section>
  );
}
