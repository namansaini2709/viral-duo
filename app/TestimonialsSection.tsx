import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { img, testimonials } from './data';

function TestimonialCard({ title, text, name, role, avatar, featured, videoImg, videoUrl }: {
  title: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
  featured?: boolean;
  videoImg?: string;
  videoUrl?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (featured) {
    return (
      <motion.div
        className="testimonialCard featured"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div 
          className="testimonialVideo" 
          style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }} 
          onClick={() => setIsPlaying(true)}
        >
          <AnimatePresence mode="wait">
            {isPlaying && videoUrl ? (
              <motion.video
                key="video"
                src={videoUrl}
                controls
                autoPlay
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                <img src={videoImg} alt={`Video testimonial from ${name}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <button className="playBtn" aria-label="Play video testimonial">▶</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="featuredContent">
          <div className="stars" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star" aria-hidden="true">★</span>
            ))}
          </div>
          <div className="testimonialContent" style={{ marginTop: '24px' }}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
          <div className="testimonialProfile" style={{ marginTop: '40px' }}>
            <img src={avatar} alt={`${name}'s avatar`} loading="lazy" style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#fff', padding: '4px', borderRadius: '50%' }} />
            <div className="profileInfo">
              <b>{name}</b>
              <span>{role}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="testimonialCard"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="stars" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="star" aria-hidden="true">★</span>
        ))}
      </div>
      <div className="testimonialContent">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="testimonialProfile">
        <img src={avatar} alt={`${name}'s avatar`} loading="lazy" style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#fff', padding: '4px', borderRadius: '50%' }} />
        <div className="profileInfo">
          <b>{name}</b>
          <span>{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section testimonials">
      <div className="testimonialsHeader">
        <p className="eyebrow">testimonials</p>
        <h2>Trusted by 15+ <br /> Companies</h2>
      </div>
      <div className="testimonialGrid">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
