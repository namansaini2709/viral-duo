import React from 'react';
import { brandLogos } from './data';

export default function BrandStrip() {
  return (
    <section className="brandStrip">
      <div className="brandContent">
        <p className="brandTitle">15+ BRANDS LEVELED UP THEIR CONTENT GAME</p>
        <div className="brandMarqueeContainer">
          <div className="brandMarquee">
            {[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
              <div key={i} className="brandItem" style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 20px' }}>
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    background: '#fff',
                    padding: '2px'
                  }} 
                />
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
