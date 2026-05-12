import React from 'react';
import { brandLogos } from './data';

export default function BrandStrip() {
  return (
    <section className="brandStrip">
      <div className="brandContent">
        <p className="brandTitle">30+ BRANDS LEVELED UP THEIR CONTENT GAME</p>
        <div className="brandMarqueeContainer">
          <div className="brandMarquee">
            {[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map((logo, i) => (
              <div key={i} className="brandItem">
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
