"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ShiftButton from "../ShiftButton";
import AboutGallery from "./AboutGallery";

const img = {
  team: [
    "https://framerusercontent.com/images/zcV8VMLW2UaiLm9AJM8MPiwdlw.jpg?width=790&height=936",
    "https://framerusercontent.com/images/o6duUa9OkHlf9DhOgeIlWNcRGY.jpg?width=790&height=936",
    "https://framerusercontent.com/images/Q4PeZp2Qx7rmA1hYjx2r2TeGlQ.jpg?width=790&height=936",
    "https://framerusercontent.com/images/DDCUixRHvKkrC3Ij9VowKTydSFE.jpg?width=790&height=936",
    "https://framerusercontent.com/images/ZsEIaooNaf9TIZjuTEevCpMqEe8.jpg?width=790&height=936",
    "https://framerusercontent.com/images/5gXitsm3iI0zoj6mry7iO1T3Xo.jpg?width=790&height=936",
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="aboutPage">
      {/* Navigation */}
      <motion.nav
        className="navbar"
        initial={false}
        animate={{
          width: isAtTop ? "100%" : "calc(100% - 36px)",
          maxWidth: isAtTop ? "100%" : "1180px",
          borderRadius: isAtTop ? "0px" : "999px",
          top: isAtTop ? "0px" : (isHidden ? "-100px" : "18px"),
          x: "-50%",
          left: "50%",
          background: isAtTop ? "rgba(244, 240, 232, 0)" : "rgba(244, 240, 232, 0.95)",
          borderColor: isAtTop ? "rgba(0,0,0,0)" : "rgba(11, 11, 10, 0.1)",
          padding: isAtTop ? "12px 40px" : "6px 10px 6px 20px",
          color: "#0b0b0a",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="brand" href="/" style={{ color: 'inherit' }}>The Viral Duo</a>
        <div className="navLinks" style={{ color: 'inherit' }}>
          <a href="/#work">Projects</a>
          <a href="/about" className="active">About Us</a>
          <a href="/#faq">FAQ</a>
        </div>
        <ShiftButton dark={!isAtTop} href="#contact" showIcon={false}>Book a call</ShiftButton>
      </motion.nav>

      {/* Hero Section */}
      <section className="aboutHero">
        <div className="heroContainer">
          <div className="heroText">
            <div className="overflow-hidden">
              <motion.p 
                className="pill pink"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                ABOUT US
              </motion.p>
            </div>
            <div className="heroLine">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Built by people who won’t
              </motion.h1>
            </div>
            <div className="heroLine">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                ship content they’d skip
              </motion.h1>
            </div>
          </div>
          
          <motion.div 
            className="heroImageWrapper"
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="/photo.png" 
              alt="Creativity" 
            />
          </motion.div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="aboutVision">
        <div className="visionContent">
          <motion.div 
            className="visionText"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="pill pink">OUR VISION</span>
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
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={img.vision} alt="Our Vision" />
          </motion.div>
        </div>
      </section>

      {/* Our Goal Gallery */}
      <AboutGallery />

      {/* Team Section */}
      <section className="aboutTeam">
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
          {img.team.map((src, i) => (
            <motion.div 
              key={i} 
              className="teamMember"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="memberImage">
                <img src={src} alt={`Team Member ${i + 1}`} />
              </div>
              <div className="memberInfo">
                <h3>The Viral Duo</h3>
                <p>Social Experts</p>
              </div>
            </motion.div>
          ))}
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
          <ShiftButton dark large href="#contact">Book a Call</ShiftButton>
        </motion.div>
      </section>
    </main>
  );
}
