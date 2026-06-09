"use client";

import React from "react";
import WiggleButton from "../WiggleButton";

export default function TermsContent() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "140px 24px 80px", color: "var(--ink)", fontFamily: "Instrument Sans, system-ui, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        
        {/* Editorial Floating Tag */}
        <div style={{ display: "inline-block", background: "var(--lime)", color: "var(--ink)", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "24px", border: "1px solid var(--ink)" , boxShadow: "2px 2px 0px var(--ink)" }}>
          Legal / Terms
        </div>

        {/* Dynamic Stylized Title */}
        <h1 style={{ fontSize: "clamp(42px, 8vw, 84px)", fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Terms & <br /> Conditions
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "16px", fontWeight: 500, marginBottom: "48px" }}>
          Last updated: June 10, 2026 // Content delivery conditions
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Card 1 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#B4A9FF", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>01</span>
              Services Rendered
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              The Viral Duo provides professional UGC content creation, short-form editing, design packages, product photoshoots, event coverage, and social media account management.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#F9A8D4", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>02</span>
              Consultations & Scheduling
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              Consultation calls booked via our Cal.com integrations are subject to calendar availability. Rescheduling or cancellation should be communicated in advance when possible.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#D6D3CF", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>03</span>
              Content Licensing
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              Usage rights and media licensing terms for custom UGC or commercial photoshoots are governed by individual client service agreements.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ background: "var(--card)", padding: "32px", borderRadius: "32px", border: "1px solid var(--line)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: "#99F6E4", fontSize: "14px", color: "var(--ink)", fontWeight: 800 }}>04</span>
              Revisions & Approvals
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(11, 11, 10, 0.8)", lineHeight: "1.6" }}>
              Client revisions and draft feedback cycles will follow timelines specified during project onboarding.
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
