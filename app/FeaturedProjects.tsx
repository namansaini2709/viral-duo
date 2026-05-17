"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
      // Reset the video so the poster thumbnail shows again
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

export default function FeaturedProjects() {
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);

  return (
    <section className="section" id="work" style={{ paddingTop: '160px' }}>
      <div className="sectionHead">
        <p className="eyebrow">featured projects</p>
        <h2>Work We're <br /> Proud Of</h2>
      </div>

      <div className="workGrid">
        {[
          ["/videos-optimized/shreeradhey.mp4", "/Cover pages/Shri Radhey Krishna Cover.PNG", "Shri Radhey Krishna Jewellers", "+112% Sales Growth", "/logos/Shri radhey Krishna  jewellers.JPG", brandLinks.shriRadheyKrishnaJewellers],
          ["/videos-optimized/MOTO MANIA.mp4", "/Cover pages/Fof fitness.png", "FOF Fitnesa", "+154% Member Growth", "/logos/FOF Fitnesa logo.jpeg", brandLinks.fofFitnesa],
          ["/videos-optimized/Global 2 (1).mp4", "/Cover pages/Global Holidays.png", "Global Holidays", "+84% Booking Growth", "/logos/Global Holidays.PNG", brandLinks.globalHolidays],
          ["/videos-optimized/Career launcher.mp4", "/Cover pages/Career Launcher cover.jpg", "Career Launcher", "+180% Student Leads", "/logos/carrer launcher.JPG", brandLinks.careerLauncher],
          ["/videos-optimized/VDMC.mp4", "/Cover pages/Vdmc.PNG", "VDMC", "+220% Daily Orders", "/logos/Vdmc logo.JPG", brandLinks.vdmc]
        ].map(([src, poster, name, result, logo, href], i) => (
          <WorkCard
            key={name}
            src={src}
            poster={poster}
            name={name}
            result={result}
            logo={logo}
            href={href}
            i={i}
            activePlayingIndex={activePlayingIndex}
            setActivePlayingIndex={setActivePlayingIndex}
          />
        ))}
      </div>
    </section>
  );
}
