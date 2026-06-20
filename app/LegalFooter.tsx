"use client";

import React from "react";
import Link from "next/link";

interface LegalFooterProps {
  theme: "light" | "dark";
  currentPage: "privacy" | "terms";
}

export default function LegalFooter({ theme, currentPage }: LegalFooterProps) {
  const isDark = theme === "dark";
  
  const bgColor = "linear-gradient(135deg, #a3e635 0%, #10b981 100%)";
  const textColor = "#000000";
  const borderColor = "rgba(0, 0, 0, 0.15)";
  const linkColor = "#000000";

  return (
    <footer 
      style={{
        background: bgColor,
        color: textColor,
        borderTop: `1px solid ${borderColor}`,
        padding: "48px 24px",
        fontFamily: "Instrument Sans, system-ui, sans-serif",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px"
        }}
        className="legalFooterContainer"
      >
        {/* Left Side: Brand Logo and Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", border: `1px solid ${textColor}`, padding: "2px" }}>
            <img src="/logo-v2.png?v=5" alt="The Viral Duo" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>The Viral Duo</span>
        </div>

        {/* Center: Legal Toggle Links */}
        <div style={{ display: "flex", gap: "20px", fontSize: "14px", fontWeight: 600 }}>
          {currentPage === "privacy" ? (
            <Link 
              href="/terms" 
              style={{ 
                color: textColor, 
                textDecoration: "none", 
                borderBottom: `1px solid ${linkColor}`,
                paddingBottom: "2px",
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Terms & Conditions
            </Link>
          ) : (
            <Link 
              href="/privacy" 
              style={{ 
                color: textColor, 
                textDecoration: "none", 
                borderBottom: `1px solid ${linkColor}`,
                paddingBottom: "2px",
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Privacy Policy
            </Link>
          )}
          <Link 
            href="/" 
            style={{ 
              color: textColor, 
              textDecoration: "none",
              opacity: 0.6,
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
          >
            Home
          </Link>
        </div>

        {/* Right Side: Copyright */}
        <div style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.6)", fontWeight: 500 }}>
          © 2026 THE VIRAL DUO. ALL RIGHTS RESERVED. DESIGNED BY BlackSea Organisation
        </div>
      </div>
    </footer>
  );
}
