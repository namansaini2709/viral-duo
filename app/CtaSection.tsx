import React from 'react';
import ShiftButton from './ShiftButton';
import { img } from './data';

export default function CtaSection() {
  return (
    <section className="cta" id="contact">
      <div className="ctaCard ctaCardDark">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="ctaWavyDecor">
          <path d="M10 50 Q 30 10 50 50 T 90 50" stroke="#fbb6ed" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <h2>UGC that grows your brand.</h2>
        <p>The Viral Duo helps brands create content that earns attention, builds engagement, and drives real growth.</p>
        <ShiftButton 
          dataCalLink="theviralduo/15min" 
          dataCalConfig='{"layout":"month_view"}'
          light 
          large 
          leftIconColor="#E699FF" 
          rightIconColor="#fbb6ed"
        >
          Book a call
        </ShiftButton>
      </div>

      <div className="ctaCard">
        <img src={img.hero} alt="Creative process" className="ctaCardImage" />
      </div>
    </section>
  );
}
