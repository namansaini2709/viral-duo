import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { img } from './data';

function useScrollProgressTransform(progress: any, range: number[], output: number[]) {
  return useTransform(progress, range, output);
}

function MissionBlockWithLine({
  className,
  children,
  lineColor,
  path,
  strokeWidth = 8,
  viewBox = "0 0 1000 1000"
}: {
  className: string;
  children: React.ReactNode;
  lineColor: string;
  path: string;
  strokeWidth?: number;
  viewBox?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const pathLength = useScrollProgressTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const opacity = useScrollProgressTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  return (
    <motion.article
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="missionLine">
        <svg viewBox={viewBox} fill="none" preserveAspectRatio="none">
          <motion.path
            d={path}
            stroke={lineColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ pathLength, opacity }}
          />
        </svg>
      </div>
      {children}
    </motion.article>
  );
}

export default function MissionSection() {
  return (
    <section className="section mission">
      <div className="missionHeader">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="eyebrow"
        >
          our mission
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We made social media into a consistent, high-performing growth channel.
        </motion.h2>
      </div>

      <div className="missionBlocks">
        <MissionBlockWithLine
          className="missionBlock"
          lineColor="#ffa8f2"
          path="M 1000,50 C 1000,150 800,150 750,300 C 650,450 400,450 350,500 C 150,550 100,700 150,850"
          strokeWidth={8}
          viewBox="0 0 2000 1000"
        >
          <div className="missionImage">
            <img src={img.phone1} alt="Growth" />
            <motion.div
              className="missionMetric pink"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <strong>200%</strong>
              <span>Organic Follower Growth</span>
            </motion.div>
          </div>
          <div className="missionText">
            <h3>Performance-driven UGC that delivers results</h3>
            <p>Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to measurable growth.</p>
          </div>
        </MissionBlockWithLine>

        <MissionBlockWithLine
          className="missionBlock reverse"
          lineColor="#9967ff"
          path="M 600,600 C 800,700 1000,900 800,1200"
          strokeWidth={4}
        >
          <div className="missionText">
            <h3>Creator-led content, long-term growth.</h3>
            <p>We source and test creators across niches and communities, focusing on those who naturally align with your brand.</p>
          </div>
          <div className="missionImage">
            <img src={img.phone2} alt="Impact" />
            <motion.div
              className="missionMetric purple"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <strong>4.2M</strong>
              <span>Impressions</span>
            </motion.div>
          </div>
        </MissionBlockWithLine>
      </div>
    </section>
  );
}
