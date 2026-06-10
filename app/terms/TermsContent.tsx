"use client";

import React from "react";
import WiggleButton from "../WiggleButton";
import LegalFooter from "../LegalFooter";

export default function TermsContent() {
  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", display: "flex", flexDirection: "column", color: "#f4f0e8", fontFamily: "Instrument Sans, system-ui, sans-serif" }}>
      <div style={{ flex: 1, maxWidth: "800px", margin: "0 auto", width: "100%", padding: "140px 24px 80px", position: "relative" }}>
        
        {/* Editorial Floating Tag */}
        <div style={{ display: "inline-block", background: "var(--lime)", color: "var(--ink)", padding: "8px 16px", borderRadius: "999px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "24px", border: "1.5px solid #f4f0e8", boxShadow: "3px 3px 0px #f4f0e8" }}>
          Legal / Terms
        </div>

        {/* Dynamic Stylized Title */}
        <h1 style={{ fontSize: "clamp(42px, 8vw, 84px)", fontFamily: "Playfair Display, serif", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "16px", color: "#f4f0e8" }}>
          Terms & <br /> Conditions
        </h1>
        <p style={{ color: "rgba(244, 240, 232, 0.6)", fontSize: "16px", fontWeight: 500, marginBottom: "48px" }}>
          Last updated: June 10, 2026 // Content delivery conditions
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Card 1 */}
          <div style={{ position: "relative", background: "rgba(244, 240, 232, 0.03)", padding: "36px 32px", borderRadius: "28px", border: "1px solid rgba(244, 240, 232, 0.1)", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "20px", bottom: "-10px", fontSize: "100px", fontWeight: 900, color: "rgba(244, 240, 232, 0.04)", userSelect: "none", pointerEvents: "none", fontFamily: "Playfair Display, serif" }}>01</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px", color: "var(--lime)", display: "flex", alignItems: "center", gap: "10px" }}>
              Services Rendered
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(244, 240, 232, 0.75)", lineHeight: "1.6", position: "relative", zIndex: 2 }}>
              The Viral Duo provides professional UGC content creation, short-form editing, design packages, product photoshoots, event coverage, and social media account management.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ position: "relative", background: "rgba(244, 240, 232, 0.03)", padding: "36px 32px", borderRadius: "28px", border: "1px solid rgba(244, 240, 232, 0.1)", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "20px", bottom: "-10px", fontSize: "100px", fontWeight: 900, color: "rgba(244, 240, 232, 0.04)", userSelect: "none", pointerEvents: "none", fontFamily: "Playfair Display, serif" }}>02</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px", color: "var(--lime)", display: "flex", alignItems: "center", gap: "10px" }}>
              Consultations & Scheduling
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(244, 240, 232, 0.75)", lineHeight: "1.6", position: "relative", zIndex: 2 }}>
              Consultation calls booked via our Cal.com integrations are subject to calendar availability. Rescheduling or cancellation should be communicated in advance when possible.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ position: "relative", background: "rgba(244, 240, 232, 0.03)", padding: "36px 32px", borderRadius: "28px", border: "1px solid rgba(244, 240, 232, 0.1)", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "20px", bottom: "-10px", fontSize: "100px", fontWeight: 900, color: "rgba(244, 240, 232, 0.04)", userSelect: "none", pointerEvents: "none", fontFamily: "Playfair Display, serif" }}>03</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px", color: "var(--lime)", display: "flex", alignItems: "center", gap: "10px" }}>
              Content Licensing
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(244, 240, 232, 0.75)", lineHeight: "1.6", position: "relative", zIndex: 2 }}>
              Usage rights and media licensing terms for custom UGC or commercial photoshoots are governed by individual client service agreements.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ position: "relative", background: "rgba(244, 240, 232, 0.03)", padding: "36px 32px", borderRadius: "28px", border: "1px solid rgba(244, 240, 232, 0.1)", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "20px", bottom: "-10px", fontSize: "100px", fontWeight: 900, color: "rgba(244, 240, 232, 0.04)", userSelect: "none", pointerEvents: "none", fontFamily: "Playfair Display, serif" }}>04</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px", color: "var(--lime)", display: "flex", alignItems: "center", gap: "10px" }}>
              Revisions & Approvals
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(244, 240, 232, 0.75)", lineHeight: "1.6", position: "relative", zIndex: 2 }}>
              Client revisions and draft feedback cycles will follow timelines specified during project onboarding.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <WiggleButton href="/" className="backHomeLink" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#f4f0e8", fontWeight: 700, textDecoration: "none", borderBottom: "2px solid var(--lime)", paddingBottom: "4px", transition: "opacity 0.2s" } as any}>
            <span>← Go back home</span>
          </WiggleButton>
        </div>

      </div>
      <LegalFooter theme="dark" currentPage="terms" />
    </main>
  );
}
