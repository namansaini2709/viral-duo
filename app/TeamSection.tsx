import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';
import ShiftButton from './ShiftButton';
import { img } from './data';

function TeamLineAnimation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const persistentPathLength = useMotionValue(0);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const targetLength = Math.min(latest / 0.7, 1);
    if (targetLength > persistentPathLength.get()) {
      persistentPathLength.set(targetLength);
    }
  });

  const path = "M 0 300 C 500 100, 1500 500, 2000 300";

  return (
    <div ref={ref} style={{ width: '80%', height: '100%', margin: '0 auto' }}>
      <svg viewBox="0 0 2000 600" fill="none" preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
        <motion.path
          d={path}
          stroke="#fbb6ed"
          strokeWidth="20"
          strokeLinecap="round"
          style={{ pathLength: persistentPathLength, opacity }}
        />
      </svg>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="teamSection">
      <div className="teamHeader">
        <span className="teamBadge">OUR TEAM</span>
        <h2>The Content Experts</h2>
      </div>

      <div className="teamContainer">
        <div className="teamLine">
          <TeamLineAnimation />
        </div>

        <div className="teamGridCluttered">
          {img.team.map((member, i) => (
            <motion.div
              key={i}
              className="teamCard"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img src={member.avatar} alt={`Team member ${member.name}`} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="teamFooter">
        <p>The Viral Duo helped us turn ideas into consistent, high-performing social content.</p>
        <ShiftButton href="/about" dark large leftIconColor="#A78BFA" rightIconColor="#F472B6">More About Us</ShiftButton>
      </div>
    </section>
  );
}
