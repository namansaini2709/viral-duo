"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ShiftButton from "../ShiftButton";
import AboutGallery from "./AboutGallery";
import Navbar from "../Navbar";
import LazyVideo from "../LazyVideo";

const img = {
  team: [
    "/team/shubham.jpeg",
    "/team/pushkar.jpeg",
    "/team/yogita.jpeg",
    "/team/neer.jpeg",
  ],
  vision: "/photo.png",
};

export default function AboutPage() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 10);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="aboutPage">
      <Navbar 
        isAtTop={isAtTop} 
        isHidden={isHidden} 
        navTheme="light" 
        isOverFooter={false} 
      />

      {/* Hero Section */}
      <section className="aboutHero">
        {/* Mobile-only Pill positioned above the video/container */}
        <div className="mobilePillWrapper">
          <motion.p 
            className="pill pink"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            ABOUT US
          </motion.p>
        </div>

        <div className="heroContainer">
          <div className="heroText">
            <div className="overflow-hidden desktopOnlyPill">
              <motion.p 
                className="pill pink"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                ABOUT US
              </motion.p>
            </div>
            <div className="heroLine">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 45, 
                  damping: 16, 
                  mass: 1.2,
                  delay: 0.05 
                }}
              >
                Built by people who won’t
              </motion.h1>
            </div>
            <div className="heroLine">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 45, 
                  damping: 16, 
                  mass: 1.2,
                  delay: 0.3 // Staggered delay for the second line, adjusted slightly for slower speed
                }}
              >
                ship content they’d skip
              </motion.h1>
            </div>
          </div>
          
          <motion.div 
            className="heroImageWrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <LazyVideo
              src="/Ilustrated videos/Animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Creativity"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="aboutVision" id="vision">
        <div className="visionContent">
          <motion.div 
            className="visionText"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="pill pink" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <img src="/logo-v2.png" alt="" style={{ width: '18px', height: '18px', objectFit: 'contain', borderRadius: '50%' }} />
              OUR VISION
            </span>
            <h2>What We Stand For</h2>
            <p>
              Social media moves fast. Audiences are sharp. They know when they're being sold to, 
              and they know when a brand is just checking a box. At The Viral Duo, we don't 
              do "standard." We build explosive growth engines.
            </p>
            <p style={{ marginTop: '20px' }}>
              We believe every frame should stop the scroll. Every caption should start 
              a conversation. And every strategy should lead to measurable, 
              sustainable growth.
            </p>
          </motion.div>
          <motion.div 
            className="visionImage"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              type: "spring", 
              stiffness: 90, 
              damping: 14, 
              mass: 0.8,
              delay: 0.1
            }}
          >
            <img src={img.vision} alt="Our Vision" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Our Goal Gallery */}
      <AboutGallery />

      {/* Team Section */}
      <section className="aboutTeam" id="team">
        <div className="teamHeader">
          <motion.span 
            className="pill pink"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            OUR TEAM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Small Team, Big Impact
          </motion.h2>
        </div>
        <div className="teamGrid">
          {img.team.map((src, i) => {
            const teamData = [
              { name: "Shubham Goel", role: "Founder" },
              { name: "Pushkar Sharma", role: "Co-Founder" },
              { name: "Yogita Goel", role: "Manager" },
              { name: "Neer Mittal", role: "Content Head" }
            ];
            return (
              <motion.div 
                key={i} 
                className="teamMember"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: (i % 4) * 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <div className="memberImage">
                  <img src={src} alt={teamData[i].name} loading="lazy" />
                </div>
                <div className="memberInfo">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/logo-v2.png" alt="" style={{ width: '20px', height: '20px', objectFit: 'contain', borderRadius: '50%' }} />
                    {teamData[i].name}
                  </h3>
                  <p>{teamData[i].role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="aboutCTA">
        <motion.div 
          className="ctaContent"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Let’s grow through content!</h2>
          <ShiftButton dark large dataCalLink="theviralduo/15min" dataCalConfig='{"layout":"month_view"}'>Book a Call</ShiftButton>
        </motion.div>
      </section>
    </main>
  );
}
