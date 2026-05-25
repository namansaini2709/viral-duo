"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { services } from './data';
import LazyVideo from './LazyVideo';

export default function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [stack, setStack] = useState([0, 1, 2, 3]);
  const currentIndex = stack[0];

  const switchCard = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;

    setStack((prevStack) => {
      const remaining = prevStack.filter(idx => idx !== targetIndex && idx !== currentIndex);
      return [targetIndex, currentIndex, ...remaining];
    });
    dragX.set(0);
  };

  // Framer Motion values for interactive drag-based rotation
  const dragX = useMotionValue(0);
  const rotateValue = useTransform(dragX, [-200, 200], [-10, 10]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="services" className="servicesSection">
      <div className="sectionHead">
        <span className="eyebrow">Our Expertise</span>
        <h2>High-Impact Solutions for Digital Domination</h2>
      </div>

      {isMobile ? (
        /* Bespoke Luxury 3D Card Stack & Tab Redesign */
        <div className="servicesCarouselContainer">
          {/* Custom iOS-like Premium Tab Selector */}
          <div className="servicesTabSelector">
            {services.map((service, index) => (
              <button
                key={service.id}
                className={`serviceTabBtn ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  switchCard(index);
                }}
              >
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeServiceTabPill"
                    className={`activeServiceTabBg ${service.color}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="serviceTabBtnText">
                  {service.id} / {service.tabLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Immersive 3D Card Deck Stack */}
          <div className="servicesCardDeck">
            {services.map((service, index) => {
              const isTop = index === stack[0];
              const isNext = index === stack[1];
              const isThird = index === stack[2];
              const isFourth = index === stack[3];
              
              // Render and animate all four cards in the stack to show depth
              const inDeck = isTop || isNext || isThird || isFourth;

              return (
                <motion.div
                  key={service.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: isTop ? 'auto' : 'none',
                    display: inDeck ? 'flex' : 'none',
                    zIndex: isTop ? 10 : isNext ? 9 : isThird ? 8 : isFourth ? 7 : 1,
                  }}
                  initial={false}
                  animate={{
                    x: isTop ? [index % 2 === 0 ? -450 : 450, 0] : 0,
                    opacity: isTop ? [0, 1] : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22
                  }}
                >
                  <motion.div
                    className={`serviceCardMobile ${service.color}`}
                    style={{
                      x: isTop ? dragX : 0,
                      rotate: isTop ? rotateValue : isNext ? -3 : isThird ? 3 : isFourth ? -1.5 : 0,
                      cursor: isTop ? 'grab' : 'default',
                      touchAction: 'pan-y',
                      width: '100%',
                      height: '100%',
                    }}
                    animate={{
                      scale: isTop ? 1 : isNext ? 0.90 : isThird ? 0.80 : isFourth ? 0.70 : 0.60,
                      y: isTop ? 0 : isNext ? 18 : isThird ? 36 : isFourth ? 54 : 72,
                      opacity: isTop ? 1 : isNext ? 0.92 : isThird ? 0.45 : isFourth ? 0.15 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.65}
                    onDragEnd={(e, info) => {
                      if (!isTop) return;
                      const swipeThreshold = 80;
                      if (info.offset.x < -swipeThreshold) {
                        // Swipe left -> next card
                        const nextIndex = (currentIndex + 1) % services.length;
                        switchCard(nextIndex);
                      } else if (info.offset.x > swipeThreshold) {
                        // Swipe right -> prev card
                        const prevIndex = (currentIndex - 1 + services.length) % services.length;
                        switchCard(prevIndex);
                      } else {
                        // Release snap back
                        dragX.set(0);
                      }
                    }}
                  >
                    {/* Oversized background index watermark */}
                    <div className="cardWatermark">{service.id}</div>

                    <div className="serviceCardHeaderMobile">
                      <span className="cardLabel">SERVICE / {service.id}</span>
                      <div className="cardLiveBadge">
                        <span className={`liveDot ${isTop ? 'activePulse' : ''}`} />
                        <span>CASE STUDY</span>
                      </div>
                    </div>

                    <div className="serviceCardBodyMobile">
                      <div className="serviceCardMedia">
                        {service.videoUrl && isTop ? (
                          <video
                            key="playing"
                            src={service.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="serviceVideoMobile"
                            preload="auto"
                          />
                        ) : (
                          <img
                            src={service.img}
                            alt={service.title}
                            className="serviceImgMobile"
                          />
                        )}
                      </div>

                      <div className="serviceCardInfo">
                        <h3 className="serviceCardTitleMobile">{service.title}</h3>
                        <p className="serviceCardDescMobile">{service.desc}</p>
                        
                        {/* Premium Highlights Grid */}
                        <div className="serviceHighlightsGrid">
                          {service.highlights && service.highlights.map((highlight, idx) => (
                            <div key={idx} className="highlightTag">
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <div className="serviceCardFooterMobile">
                          <div className="serviceCardMetricsMobile">
                            <span className="metricValue">{service.metric}</span>
                            <span className="metricUnit">{service.unit}</span>
                          </div>

                          <a 
                            href="https://www.instagram.com/theviralduo/?hl=en" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="serviceCardBtnMobile animateGrowBtn"
                          >
                            <span>Scale My Brand</span>
                            <span className="btnArrowMobile">↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Subtle Swipe Helper Indicators */}
          <div className="servicesDotsMobile">
            {services.map((_, index) => (
              <button
                key={index}
                className={`serviceDotMobile ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  switchCard(index);
                }}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* High-fidelity Desktop Sticky Card Stacking */
        <div className="servicesWrapper">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="serviceCardSticky"
              style={{ zIndex: index + 1 }}
            >
              <motion.div
                className={`serviceCard ${service.color}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "0px", amount: 0.1, once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="serviceTab"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Service / {service.id}
                </motion.div>

                <motion.div
                  className="serviceCardBody"
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="serviceContent">
                    <motion.h2
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {service.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {service.desc}
                    </motion.p>

                    <div className="serviceMetric">
                      <motion.strong
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        {service.metric}
                      </motion.strong>
                      <small>{service.unit}</small>
                    </div>
                  </div>

                  <div className="serviceImage">
                    {service.videoUrl ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        style={{ width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden' }}
                      >
                        <LazyVideo
                          src={service.videoUrl}
                          poster={service.img}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.68 }}
                        />
                      </motion.div>
                    ) : (
                      <motion.img
                        src={service.img}
                        alt={service.title}
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
