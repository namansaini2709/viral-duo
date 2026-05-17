import React from 'react';
import { motion } from 'framer-motion';
import { services } from './data';

export default function ServicesSection() {
  return (
    <section id="services" className="servicesSection">
      <div className="sectionHead">
        <span className="eyebrow">Our Expertise</span>
        <h2>High-Impact Solutions for Digital Domination</h2>
      </div>

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
                    <motion.video
                      src={service.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ opacity: 0.68, scale: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                      viewport={{ once: true }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '40px', display: 'block' }}
                    />
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
    </section>
  );
}
