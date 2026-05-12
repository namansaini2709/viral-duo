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
          [img.hero, "Rama", "100% Follower growth"],
          [img.work1, "Pandawa", "150% Follower growth"],
          [img.work2, "Kresna", "+75% Conversion Rate"],
          [img.work3, "Sadewa", "2x Increase Leads"],
          [img.work4, "Bima", "100% Follower growth"]
        ].map(([src, name, result], i) => (
          <motion.a
            className={i === 0 ? "workCard wide" : "workCard"}
            key={name}
            href="#"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <img src={src} alt={`${name} project`} />
            <div className="cardInfo">
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
