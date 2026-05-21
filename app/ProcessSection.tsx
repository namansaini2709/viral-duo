import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = {
  planning: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
  ),
  contents: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  optimization: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  scale: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
  )
};

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = [
    { title: "Planning", color: "planning", num: "01", icon: icons.planning, text: "We do the research so it's likely to go viral. We look at trends, sounds, and what your competitors are doing to find your unique edge." },
    { title: "Contents", color: "contents", num: "02", icon: icons.contents, text: "We create native content that fits the platform. High-quality production that feels organic and authentic to the viewer's scroll." },
    { title: "Optimization", color: "optimization", num: "03", icon: icons.optimization, text: "We track performance and refine what works. Every post is a learning opportunity to double down on what resonates with your audience." },
    { title: "Scale", color: "scale", num: "04", icon: icons.scale, text: "We push what performs and drop what doesn't. Consistent growth through strategic iteration and performance-backed creative." }
  ];

  return (
    <section className="section process">
      <div className="pinkPill">Our Process</div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        From strategy to scroll-stopping content.
      </motion.h2>

      <div className="processGrid">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          return (
            <motion.div
              key={step.title}
              layout
              className={`processCard ${step.color}`}
              onMouseEnter={() => !isMobile && setActiveStep(i)}
              onClick={() => isMobile && setActiveStep(i)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{
                flex: isActive ? 4 : 1,
              }}
              viewport={{ once: true }}
              transition={{
                layout: { type: "spring", stiffness: 100, damping: 20 },
                duration: 1.2
              }}
            >
              <motion.div 
                className="processCardBgNum"
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.7,
                  x: isActive ? 0 : 40,
                  y: isActive ? 0 : (isMobile ? -20 : 20)
                }}
              >
                {step.num}
              </motion.div>

              <div className="processPatternOverlay"></div>

              <motion.div
                layout
                style={{
                  display: 'flex',
                  flexDirection: isMobile && !isActive ? 'row' : 'column',
                  alignItems: isMobile && !isActive ? 'center' : 'stretch',
                  width: '100%',
                  height: '100%',
                  gap: isMobile && !isActive ? '16px' : '0'
                }}
              >
                <motion.div
                  className="processCardHeader"
                  layout
                  animate={{
                    padding: isActive ? (isMobile ? "16px" : "24px") : (isMobile ? "8px 12px" : "12px 16px"),
                    marginBottom: isMobile && !isActive ? "0px" : (isActive ? (isMobile ? "16px" : "32px") : "12px"),
                    minWidth: isMobile && !isActive ? "auto" : "80px"
                  }}
                >
                  <motion.span
                    layout
                    animate={{ fontSize: isActive ? "22px" : "16px", fontWeight: 800 }}
                  >
                    {step.num}
                  </motion.span>
                  <motion.div
                    className="icon"
                    layout
                    animate={{
                      width: isActive ? (isMobile ? 44 : 54) : 36,
                      height: isActive ? (isMobile ? 44 : 54) : 36,
                      color: isActive ? "#000" : "#666"
                    }}
                    style={{
                      background: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                      boxShadow: isActive ? "0 8px 16px rgba(0,0,0,0.1)" : "none",
                      marginLeft: isMobile && !isActive ? "12px" : "0"
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>

                <div className="processCardBody" style={{ 
                  padding: isMobile && !isActive ? '0' : (isMobile ? '0 16px 12px' : '0 16px 16px'),
                  justifyContent: isMobile && !isActive ? 'center' : 'flex-end',
                  alignItems: isMobile && !isActive ? 'flex-start' : 'stretch'
                }}>
                  <motion.div layout style={{ 
                    display: 'flex', 
                    flexDirection: isActive ? 'column' : 'row', 
                    alignItems: isActive ? 'flex-start' : 'center', 
                    justifyContent: isMobile && !isActive ? 'flex-start' : (isActive ? 'flex-start' : 'center'), 
                    height: '100%',
                    width: '100%'
                  }}>
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            width: '100%'
                          }}
                        >
                          <motion.h3
                            style={{ 
                              whiteSpace: "nowrap",
                              fontSize: isMobile ? "24px" : "36px",
                              fontWeight: 800,
                              color: "var(--ink)",
                              marginBottom: isMobile ? "8px" : "12px",
                              lineHeight: 1.1,
                              transform: "none",
                              writingMode: "horizontal-tb"
                            }}
                          >
                            {step.title}
                          </motion.h3>
                          <motion.p
                            style={{
                              color: "rgba(0,0,0,0.75)",
                              fontSize: isMobile ? "14px" : "17px",
                              lineHeight: 1.4,
                              fontWeight: 500
                            }}
                          >
                            {step.text}
                          </motion.p>
                        </motion.div>
                      ) : (
                        <motion.h3
                          key="collapsed"
                          layout
                          style={{ whiteSpace: "nowrap" }}
                          initial={{ opacity: 0 }}
                          animate={{
                            fontSize: "20px",
                            writingMode: isMobile ? "horizontal-tb" : "vertical-rl",
                            transform: isMobile ? "rotate(0deg)" : "rotate(180deg)",
                            opacity: 0.7,
                            marginBottom: "0px"
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {step.title}
                        </motion.h3>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
