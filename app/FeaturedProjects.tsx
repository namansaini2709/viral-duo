import React from 'react';
import { motion } from 'framer-motion';
import { img } from './data';

export default function FeaturedProjects() {
  return (
    <section className="section" id="work" style={{ paddingTop: '160px' }}>
      <div className="sectionHead">
        <p className="eyebrow">featured projects</p>
        <h2>Work We're <br /> Proud Of</h2>
      </div>

      <div className="workGrid">
        {[
          ["/videos/shreeradhey.mp4", "Shri Radhey Krishna Jewellers", "100% Sales growth", "/logos/Shri radhey Krishna  jewellers.JPG"],
          ["/videos/MOTO MANIA.mp4", "FOF Fitnesa", "150% Member growth", "/logos/FOF Fitnesa logo.jpeg"],
          ["/videos/Global 2 (1).mp4", "Global Holidays", "+75% Booking Rate", "/logos/Global Holidays.PNG"],
          ["/videos/career launcher.mp4", "Career Launcher", "2x Student Leads", "/logos/carrer launcher.JPG"],
          ["/videos/VDMC.mp4", "MS Classes", "100% Growth in Inquiries", "/logos/ms classes.JPG"]
        ].map(([src, name, result, logo], i) => (
          <motion.a
            className={i === 0 ? "workCard wide" : "workCard"}
            key={name}
            href="/#work"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <video src={src} autoPlay loop muted playsInline className="workCardMedia" />
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
        ))}
      </div>
    </section>
  );
}
