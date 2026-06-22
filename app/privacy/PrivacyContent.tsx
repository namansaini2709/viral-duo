"use client";

import React from "react";
import WiggleButton from "../WiggleButton";
import LegalFooter from "../LegalFooter";

export default function PrivacyContent() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, maxWidth: "800px", margin: "0 auto", width: "100%", padding: "140px 24px 80px", position: "relative" }}>
        
        {/* Editorial Floating Tag */}
        <div style={{ display: "inline-block", background: "#a3e635", color: "var(--ink)", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "24px", border: "1.5px solid var(--ink)", boxShadow: "3px 3px 0px var(--ink)" }}>
          Legal / Security
        </div>

        {/* Dynamic Stylized Title */}
        <h1 style={{ fontSize: "clamp(42px, 8vw, 84px)", fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Privacy <br /> Policy
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "16px", fontWeight: 500, marginBottom: "48px" }}>
          Last updated: June 10, 2026 // Content protection protocols
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Card 1 */}
          <div style={{ background: "#ffffff", padding: "32px 32px 32px 40px", borderRadius: "24px", border: "1.5px solid var(--ink)", borderLeft: "8px solid #a3e635", boxShadow: "4px 4px 0px var(--ink)" }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#a3e635", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>Section 01</div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--ink)" }}>
              Information We Collect
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              We only collect basic professional information necessary to collaborate and set up scheduling calls, such as your name, business email address, company name, and social media handles.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ background: "#ffffff", padding: "32px 32px 32px 40px", borderRadius: "24px", border: "1.5px solid var(--ink)", borderLeft: "8px solid #10b981", boxShadow: "4px 4px 0px var(--ink)" }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>Section 02</div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--ink)" }}>
              How We Use Your Information
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              Your information is utilized solely to deliver premium content strategy reviews, schedule consultation sessions via our booking forms, and execute custom UGC and marketing campaigns.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ background: "#ffffff", padding: "32px 32px 32px 40px", borderRadius: "24px", border: "1.5px solid var(--ink)", borderLeft: "8px solid #EAB308", boxShadow: "4px 4px 0px var(--ink)" }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#EAB308", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>Section 03</div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--ink)" }}>
              Third-Party Services
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              We use Cal.com for scheduling and booking integrations. Cal.com operates under its own strict privacy protocols regarding call scheduling parameters.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ background: "#ffffff", padding: "32px 32px 32px 40px", borderRadius: "24px", border: "1.5px solid var(--ink)", borderLeft: "8px solid #2DD4BF", boxShadow: "4px 4px 0px var(--ink)" }}>
            <div style={{ fontSize: "12px", fontWeight: 800, color: "#2DD4BF", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>Section 04</div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "var(--ink)" }}>
              Data Protection
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              The Viral Duo implements modern security measures to safeguard all digital assets, client metrics, and campaign reports from unauthorized access or modification.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <WiggleButton href="/" className="backHomeLink" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--ink)", fontWeight: 700, textDecoration: "none", borderBottom: "2px solid #a3e635", paddingBottom: "4px", transition: "opacity 0.2s" } as any}>
            <span>← Go back home</span>
          </WiggleButton>
        </div>

      </div>
      <LegalFooter theme="light" currentPage="privacy" />
    </main>
  );
}
