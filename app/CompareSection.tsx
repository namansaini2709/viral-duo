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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
        viewport={{ once: false, amount: 0.5 }}
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
              viewport={{ once: false, margin: "-60px" }}
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
        /* Sleek, Minimalist, Interactive Comparison Table */
        <div className="compareTableContainer">
          {/* Table Header */}
          <div className="compareTableHeader">
            <div className="compareHeaderCol badCol">
              <h3>Other Agencies</h3>
            </div>
            <div className="compareHeaderCol goodCol">
              <h3>
                <div className="theViralDuoLogo">
                  <img src="/logo-v2.png?v=5" alt="The Viral Duo Logo" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                The Viral Duo
              </h3>
            </div>
          </div>

          {/* Table Body */}
          <div className="compareTableBody">
            {comparisonPairs.map((pair, index) => {
              const isHovered = hoveredRow === index;
              return (
                <div
                  key={index}
                  className={`compareTableRow ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Bad Option */}
                  <div className="compareCol badCol">
                    <span className="compareIcon bad">✕</span>
                    <span className="compareText bad">{pair.bad}</span>
                  </div>

                  {/* Floating Center Label */}
                  <div className="compareRowBadgeCenter">
                    <span>{pair.label}</span>
                  </div>

                  {/* Good Option */}
                  <div className="compareCol goodCol">
                    <span className="compareIcon good">✓</span>
                    <span className="compareText good">{pair.good}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
