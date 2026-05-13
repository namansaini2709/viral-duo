import React from 'react';
import { motion } from 'framer-motion';
import { img, testimonials } from './data';

function TestimonialCard({ title, text, name, role, avatar, featured, videoImg }: {
  title: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
  featured?: boolean;
  videoImg?: string;
}) {
  if (featured) {
    return (
      <motion.div
        className="testimonialCard featured"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="testimonialVideo">
          <img src={videoImg} alt="Testimonial" />
          <div className="playBtn">▶</div>
        </div>
        <div className="featuredContent">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">★</span>
            ))}
          </div>
          <div className="testimonialContent" style={{ marginTop: '24px' }}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
          <div className="testimonialProfile" style={{ marginTop: '40px' }}>
            <img src={avatar} alt={name} style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#fff', padding: '4px', borderRadius: '50%' }} />
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
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
      </div>
      <div className="testimonialContent">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="testimonialProfile">
        <img src={avatar} alt={name} style={{ objectFit: 'contain', background: '#fff', padding: '4px', borderRadius: '50%' }} />
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
        <h2>Trusted by 40+ <br /> Companies</h2>
      </div>
      <div className="testimonialGrid">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
