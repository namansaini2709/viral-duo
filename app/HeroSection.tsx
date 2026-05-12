import React from 'react';
import HeroStack from './HeroStack';
import ShiftButton from './ShiftButton';
import { img } from './data';

export default function HeroSection() {
  return (
    <section className="hero section">
      <div className="heroTitle">
        <h1>UGC that grows your brand.</h1>
        <ul>
          <li>SHORT FORM CONTENT</li>
          <li>SOCIAL MEDIA MANAGEMENT</li>
          <li>INFLUENCER MARKETING</li>
        </ul>
      </div>
      <div className="heroRibbonContainer" style={{ top: '44%' }}>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="heroRibbonSvg">
          <defs>
            <path id="ribbonPath" d="M 0 100 C 250 220, 250 220, 500 100 S 750 -20, 1000 100" />
          </defs>
          <use href="#ribbonPath" fill="none" stroke="#F472B6" strokeWidth="28" strokeLinecap="round" />
          <text className="heroRibbonText" style={{ fontSize: '11px' }}>
            <textPath href="#ribbonPath" startOffset="0%">
              {Array(6).fill("SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING • ").join("")}
              <animate attributeName="startOffset" from="0%" to="-100%" dur="20s" repeatCount="indefinite" />
            </textPath>
          </text>
        </svg>
      </div>
      <HeroStack slides={[img.hero, img.work1, img.work2, img.work3, img.work4]} />
      <div className="heroProject">
        <img src={img.team[0]} alt="" />
        <div>
          <p>NEW PROJECT!</p>
          <b>Making Rama unmistakable on social</b>
        </div>
      </div>
      <div className="heroIntroCopy">
        <p>The Viral Duo helps brands create content that truly connects with their audience, consistently and strategically across social media.</p>
        <ShiftButton dark href="#contact" large leftIconColor="#A78BFA" rightIconColor="#F472B6" style={{ marginLeft: '60px' }}>Book a call</ShiftButton>
      </div>
    </section>
  );
}
