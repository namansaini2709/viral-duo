import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CompareSection() {
  const [hoveredCard, setHoveredCard] = useState<null | 'agencies' | 'theViralDuo'>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <div
          onMouseEnter={() => setHoveredCard('agencies')}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ position: 'relative', zIndex: hoveredCard === 'agencies' ? 10 : 1 }}
        >
          <motion.div
            className="compareCard agencies"
            initial={{ opacity: 0, x: -50, rotate: 0 }}
            animate={{
              x: isMobile ? 0 : (hoveredCard === 'agencies' ? 0 : (hoveredCard === 'theViralDuo' ? -80 : 20)),
              rotate: isMobile ? 0 : (hoveredCard === 'agencies' ? 0 : -2),
              scale: hoveredCard === 'agencies' ? 1.02 : 1,
              boxShadow: hoveredCard === 'agencies' ? "0 20px 40px rgba(0,0,0,0.05)" : "none"
            }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>Other Agencies</h3>
            <div className="compareList" role="list">
              {["Ad-like, brand-heavy", "Posting volume", "Based on follower count", "Trend-chasing", "Basic metrics"].map(x => (
                <div key={x} className="compareItem" role="listitem">
                  <span className="icon" aria-hidden="true">✕</span>
                  {x}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div
          onMouseEnter={() => setHoveredCard('theViralDuo')}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ position: 'relative', zIndex: hoveredCard === 'theViralDuo' ? 10 : 2 }}
        >
          <motion.div
            className="compareCard theViralDuo"
            initial={{ opacity: 0, x: 50, rotate: 0 }}
            animate={{
              x: isMobile ? 0 : (hoveredCard === 'theViralDuo' ? 0 : (hoveredCard === 'agencies' ? 80 : -20)),
              rotate: isMobile ? 0 : (hoveredCard === 'theViralDuo' ? 0 : 2),
              scale: hoveredCard === 'theViralDuo' ? 1.05 : 1,
              boxShadow: hoveredCard === 'theViralDuo' ? "0 40px 80px rgba(0,0,0,0.15)" : "0 20px 40px rgba(0,0,0,0.05)"
            }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>
              <div className="theViralDuoLogo">
                <img src="/logo-v2.png" alt="The Viral Duo Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              The Viral Duo
            </h3>
            <div className="compareList" role="list">
              {["Platform-native, organic-first", "Engagement & relevance", "Performance-based selection", "Strategic & brand-aligned", "Clear insights & learnings"].map(x => (
                <div key={x} className="compareItem" role="listitem">
                  <span className="icon" aria-hidden="true">✓</span>
                  {x}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
