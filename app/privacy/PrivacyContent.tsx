"use client";

import React from "react";
import WiggleButton from "../WiggleButton";

export default function PrivacyContent() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "140px 24px 80px", color: "var(--ink)", fontFamily: "Instrument Sans, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        
        {/* Editorial Floating Tag */}
        <div style={{ display: "inline-block", background: "var(--lime)", color: "var(--ink)", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "24px", border: "1px solid var(--ink)", boxShadow: "2px 2px 0px var(--ink)" }}>
          Legal / Security
        </div>

        {/* Dynamic Stylized Title */}
        <h1 style={{ fontSize: "clamp(42px, 8vw, 84px)", fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Privacy <br /> Policy
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "16px", fontWeight: 500, marginBottom: "48px" }}>
          Last updated: June 10, 2026 // Content protection protocols
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Card 1 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#B4A9FF", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>01</span>
              Information We Collect
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              We only collect basic professional information necessary to collaborate and set up scheduling calls, such as your name, business email address, company name, and social media handles.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#F9A8D4", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>02</span>
              How We Use Your Information
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              Your information is utilized solely to deliver premium content strategy reviews, schedule consultation sessions via our booking forms, and execute custom UGC and marketing campaigns.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#D6D3CF", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>03</span>
              Third-Party Services
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              We use Cal.com for scheduling and booking integrations. Cal.com operates under its own strict privacy protocols regarding call scheduling parameters.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#99F6E4", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>04</span>
              Data Protection
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              The Viral Duo implements modern security measures to safeguard all digital assets, client metrics, and campaign reports from unauthorized access or modification.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <WiggleButton href="/" className="backHomeLink" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--ink)", fontWeight: 700, textDecoration: "none", borderBottom: "2px solid var(--lime)", paddingBottom: "4px", transition: "opacity 0.2s" } as any}>
            <span>← Go back home</span>
          </WiggleButton>
        </div>

      </div>
    </main>
  );
}
