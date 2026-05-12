import React from 'react';
import { motion } from 'framer-motion';
import { img } from './data';

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
        <img src={avatar} alt={name} />
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
        {[
          {
            featured: true,
            videoImg: "https://framerusercontent.com/images/zcV8VMLW2UaiLm9AJM8MPiwdlw.jpg?width=790&height=936",
            title: "We increased our audience by 25%!",
            text: "We can bring in real-life problems and have the coaches give specific examples and solutions to help guide us and remove any roadblocks.\"",
            name: "Gatot",
            role: "CEO of Kresna",
            avatar: img.team[0]
          },
          {
            title: "Social media feels less stressful now",
            text: "The Viral Duo breaks things down in a simple way. We know what to post why we post it and how it helps our brand grow.",
            name: "Ratih",
            role: "CMO of Bima",
            avatar: img.team[1]
          },
          {
            title: "We saw real growth not just likes",
            text: "Our audience grew and so did the quality of conversations. The Viral Duo helped us focus on connection not just numbers.",
            name: "Bhagas",
            role: "Marketing of Rama",
            avatar: img.team[2]
          },
          {
            title: "We finally have a clear content direction",
            text: "Before The Viral Duo we were posting randomly. Now we have clear ideas clear messaging and a plan that makes sense.",
            name: "Jonathan",
            role: "CTO of Sadewa",
            avatar: img.team[3]
          },
          {
            title: "Our engagement went up fast",
            text: "The results speak for themselves. We've seen a massive spike in engagement and brand sentiment since working with them.",
            name: "Sarah",
            role: "VP of Nakula",
            avatar: img.team[4]
          }
        ].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
