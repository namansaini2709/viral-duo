import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CompareSection() {
  const [hoveredCard, setHoveredCard] = useState<null | 'agencies' | 'theViralDuo'>(null);

  return (
    <section className="section compare">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Don't settle for less
      </motion.h2>

      <div className="compareGrid">
        <motion.div
          className="compareCard agencies"
          onMouseEnter={() => setHoveredCard('agencies')}
          onMouseLeave={() => setHoveredCard(null)}
          initial={{ opacity: 0, x: -50, rotate: 0 }}
          animate={{
            x: hoveredCard === 'agencies' ? 0 : (hoveredCard === 'theViralDuo' ? -120 : 40),
            rotate: hoveredCard === 'agencies' ? 0 : -4,
            scale: hoveredCard === 'agencies' ? 1.02 : 1,
            zIndex: hoveredCard === 'agencies' ? 10 : 1,
            boxShadow: hoveredCard === 'agencies' ? "0 20px 40px rgba(0,0,0,0.05)" : "none"
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3>Other Agencies</h3>
          <div className="compareList">
            {["Ad-like, brand-heavy", "Posting volume", "Based on follower count", "Trend-chasing", "Basic metrics"].map(x => (
              <div key={x} className="compareItem">
                <span className="icon">✕</span>
                {x}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="compareCard theViralDuo"
          onMouseEnter={() => setHoveredCard('theViralDuo')}
          onMouseLeave={() => setHoveredCard(null)}
          initial={{ opacity: 0, x: 50, rotate: 0 }}
          animate={{
            x: hoveredCard === 'theViralDuo' ? 0 : (hoveredCard === 'agencies' ? 120 : -40),
            rotate: hoveredCard === 'theViralDuo' ? 0 : 4,
            scale: hoveredCard === 'theViralDuo' ? 1.05 : 1,
            zIndex: hoveredCard === 'theViralDuo' ? 10 : 2,
            boxShadow: hoveredCard === 'theViralDuo' ? "0 40px 80px rgba(0,0,0,0.15)" : "0 20px 40px rgba(0,0,0,0.05)"
          }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3>
            <div className="theViralDuoLogo">V</div>
            The Viral Duo
          </h3>
          <div className="compareList">
            {["Platform-native, organic-first", "Engagement & relevance", "Performance-based selection", "Strategic & brand-aligned", "Clear insights & learnings"].map(x => (
              <div key={x} className="compareItem">
                <span className="icon">✓</span>
                {x}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
