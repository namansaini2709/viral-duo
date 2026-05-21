"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Preloader() {
  const [isActive, setIsActive] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check session storage to see if we've already played the preloader this session
    const hasPlayed = sessionStorage.getItem("preloader-played");
    if (!hasPlayed) {
      setIsActive(true);
      // Disable scrolling on load
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // Show the skip hint after 1.5 seconds
    const hintTimer = setTimeout(() => {
      setShowSkipHint(true);
    }, 1500);

    // Fallback: If for any reason the video is stuck, close the preloader after 8 seconds
    const fallbackTimer = setTimeout(() => {
      handleClose();
    }, 8000);

    // Try to trigger play in case autoplay was restricted
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed or was blocked:", err);
      });
    }

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(fallbackTimer);
    };
  }, [isActive]);

  const handleClose = () => {
    if (isFading) return;
    setIsFading(true);
    
    // Mark as played in session storage
    sessionStorage.setItem("preloader-played", "true");

    // Re-enable scrolling
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Unmount after fade-out transition duration (500ms)
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isFading ? 0 : 1,
        transition: "opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "450px",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <video
          ref={videoRef}
          src="/preloader.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleClose}
          onError={handleClose}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Skip Hint */}
      <div
        style={{
          position: "absolute",
          bottom: "6vh",
          color: "rgba(255, 255, 255, 0.4)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: showSkipHint ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        Click anywhere to skip
      </div>
    </div>
  );
}
