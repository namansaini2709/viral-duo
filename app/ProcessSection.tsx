import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

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
        {[
          { title: "Planning", color: "planning", num: "01", icon: "📋", text: "We do the research so it's likely to go viral. We look at trends, sounds, and what your competitors are doing to find your unique edge." },
          { title: "Contents", color: "contents", num: "02", icon: "🎥", text: "We create native content that fits the platform. High-quality production that feels organic and authentic to the viewer's scroll." },
          { title: "Optimization", color: "optimization", num: "03", icon: "📈", text: "We track performance and refine what works. Every post is a learning opportunity to double down on what resonates with your audience." },
          { title: "Scale", color: "scale", num: "04", icon: "🚀", text: "We push what performs and drop what doesn't. Consistent growth through strategic iteration and performance-backed creative." }
        ].map((step, i) => (
          <motion.div
            key={step.title}
            layout
            className={`processCard ${step.color}`}
            onMouseEnter={() => setActiveStep(i)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{
              flex: activeStep === i ? 4 : 1,
            }}
            viewport={{ once: true }}
            transition={{
              layout: { type: "spring", stiffness: 300, damping: 30 },
              duration: 0.8
            }}
          >
            <motion.div
              className="processCardHeader"
              animate={{
                padding: activeStep === i ? "24px" : "16px",
                marginBottom: activeStep === i ? "32px" : "12px",
              }}
            >
              <motion.span
                animate={{ fontSize: activeStep === i ? "20px" : "16px" }}
              >
                {step.num}
              </motion.span>
              <motion.div
                className="icon"
                animate={{
                  scale: activeStep === i ? 1 : 0.8,
                  width: activeStep === i ? 48 : 32,
                  height: activeStep === i ? 48 : 32,
                  fontSize: activeStep === i ? "24px" : "16px"
                }}
              >
                {step.icon}
              </motion.div>
            </motion.div>
            <div className="processCardBody">
              <motion.h3
                animate={{
                  fontSize: activeStep === i ? "32px" : "18px",
                }}
                transition={{ duration: 0.4 }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                animate={{
                  opacity: activeStep === i ? 1 : 0,
                  height: activeStep === i ? "auto" : 0,
                  marginTop: activeStep === i ? 12 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {step.text}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
