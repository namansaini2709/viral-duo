import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { img } from './data';
import LazyVideo from './LazyVideo';

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

  const pathLength = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

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
          path="M -100,200 C 0,350 250,100 200,300 C 150,500 0,400 50,600 C 100,800 250,750 200,900 C 150,1050 0,900 50,750"
          strokeWidth={22}
          viewBox="0 0 1000 1000"
        >
          <div className="missionImage">
            <a 
              href="https://www.instagram.com/reel/DWo2N73k1Qu/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden' }}
            >
              <LazyVideo src="/videos-optimized/DAB4D12D-088C-42AD-A6F6-1B74217B2F8F.mp4" autoPlay loop muted playsInline />
            </a>
            <motion.div
              className="missionMetric pink"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <strong>2.2M</strong>
              <span>Organic Views</span>
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
          path="M 1100,200 C 1000,350 750,100 800,300 C 850,500 1000,400 950,600 C 900,800 750,750 800,900 C 850,1050 1000,900 950,750"
          strokeWidth={16}
          viewBox="0 0 1000 1000"
        >
          <div className="missionText">
            <h3>New Era</h3>
            <p>It was more than just a project—it was our very first live event. The sleepless nights, the raw energy, and the anxiety of seeing our dream take shape in the real world. When the crowd roared and connected with every moment, it was an emotional breakthrough that proved anything is possible. This is where the spark truly ignited.</p>
          </div>
          <div className="missionImage">
            <a 
              href="https://www.instagram.com/reel/DVWkhxsEtib/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden' }}
            >
              <LazyVideo src="/videos-optimized/inderchahal.mp4" autoPlay loop muted playsInline />
            </a>
            <motion.div
              className="missionMetric purple"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <strong>Our 1st</strong>
              <span>Hit Event</span>
            </motion.div>
          </div>
        </MissionBlockWithLine>
      </div>
    </section>
  );
}
