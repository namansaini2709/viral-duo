"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comparisonPairs = [
  {
    label: "Strategy",
    bad: "Ad-like, brand-heavy",
    good: "Platform-native, organic-first",
  },
  {
    label: "Focus",
    bad: "Posting volume",
    good: "Engagement & relevance",
  },
  {
    label: "Creators",
    bad: "Based on follower count",
    good: "Performance-based selection",
  },
  {
    label: "Execution",
    bad: "Trend-chasing",
    good: "Strategic & brand-aligned",
  },
  {
    label: "Analytics",
    bad: "Basic metrics",
    good: "Clear insights & learnings",
  }
];

export default function CompareSection() {
  const [hoveredCard, setHoveredCard] = useState<null | 'agencies' | 'theViralDuo'>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'agencies' | 'theViralDuo'>('theViralDuo');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="section compare">
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Don't settle for less
      </motion.h2>

      {isMobile ? (
        /* Immersive mobile/tablet scroll-reveal versus clash board */
        <div className="compareMobileContainer">
          {comparisonPairs.map((pair, index) => (
            <motion.div
              key={index}
              className="compareMobileRow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.05
                  }
                }
              }}
            >
              {/* Row Index Label */}
              <div className="compareRowLabel">
                <span>0{index + 1}</span>
                <span className="compareLabelDivider">/</span>
                <span>{pair.label}</span>
              </div>

              <div className="compareRowCards">
                {/* Outdated Option - Other Agencies */}
                <motion.div
                  className="compareRowCard bad"
                  variants={{
                    hidden: { opacity: 0, x: -25, rotate: -1.5 },
                    visible: { opacity: 1, x: 0, rotate: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <span className="compareRowIcon bad">✕</span>
                  <span className="compareRowText">{pair.bad}</span>
                </motion.div>

                {/* VS Glowing Badge */}
                <motion.div
                  className="compareRowVsBadge"
                  variants={{
                    hidden: { opacity: 0, scale: 0.4 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                >
                  VS
                </motion.div>

                {/* Glowing Premium Option - The Viral Duo */}
                <motion.div
                  className="compareRowCard good"
                  variants={{
                    hidden: { opacity: 0, x: 25, rotate: 1.5 },
                    visible: { opacity: 1, x: 0, rotate: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <span className="compareRowIcon good">✓</span>
                  <span className="compareRowText">{pair.good}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Original Premium Desktop Sticky Layout */
        <div className="compareGrid">
          <AnimatePresence>
            {!isMobile || activeTab === 'agencies' ? (
              <div
                key="agencies"
                className="compareColWrapper left"
                onMouseEnter={() => setHoveredCard('agencies')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  position: 'relative', 
                  zIndex: hoveredCard === 'agencies' ? 10 : 1, 
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: '24px'
                }}
              >
                <motion.div
                  style={{ position: 'relative' }}
                  initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, x: -50, rotate: 0 }}
                  animate={{
                    x: isMobile ? 0 : (hoveredCard === 'agencies' ? -20 : (hoveredCard === 'theViralDuo' ? -120 : 30)),
                    rotate: isMobile ? 0 : (hoveredCard === 'agencies' ? 0 : -2),
                    scale: hoveredCard === 'agencies' ? 1.02 : 1,
                    opacity: 1,
                    boxShadow: "none"
                  }}
                  exit={isMobile ? { opacity: 0, x: 20 } : undefined}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="compareCard agencies">
                    <h3>Other Agencies</h3>
                    <div className="compareList" role="list">
                      {["Ad-like, brand-heavy", "Posting volume", "Based on follower count", "Trend-chasing", "Basic metrics"].map(x => (
                        <div key={x} className="compareItem" role="listitem">
                          <span className="icon" aria-hidden="true">✕</span>
                          {x}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}

            {!isMobile || activeTab === 'theViralDuo' ? (
              <div
                key="theViralDuo"
                className="compareColWrapper right"
                onMouseEnter={() => setHoveredCard('theViralDuo')}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  position: 'relative', 
                  zIndex: hoveredCard === 'theViralDuo' ? 10 : 2, 
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingLeft: '24px'
                }}
              >
                <motion.div
                  style={{ position: 'relative' }}
                  initial={isMobile ? { opacity: 0, x: 20 } : { opacity: 0, x: 50, rotate: 0 }}
                  animate={{
                    x: isMobile ? 0 : (hoveredCard === 'theViralDuo' ? 20 : (hoveredCard === 'agencies' ? 120 : -30)),
                    rotate: isMobile ? 0 : (hoveredCard === 'theViralDuo' ? 0 : 2),
                    scale: hoveredCard === 'theViralDuo' ? 1.05 : 1,
                    opacity: 1,
                    boxShadow: "none"
                  }}
                  exit={isMobile ? { opacity: 0, x: -20 } : undefined}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="compareCard theViralDuo">
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
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
