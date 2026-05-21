"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const isPageReload = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries.length > 0) {
      return (navigationEntries[0] as PerformanceNavigationTiming).type === "reload";
    }
    return (window.performance as any).navigation?.type === 1;
  } catch (e) {
    return false;
  }
};

export default function Preloader() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(() => {
    return pathname === "/";
  });
  const [isFading, setIsFading] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (pathname === "/") {
      const isPlayed = sessionStorage.getItem("preloader_played") === "true";
      const isReload = isPageReload();

      if (isPlayed && !isReload) {
        setIsActive(false);
        if (typeof window !== "undefined") {
          (window as any).__preloaderFinished = true;
          window.dispatchEvent(new CustomEvent("preloader-finished"));
        }
      } else {
        sessionStorage.setItem("preloader_played", "true");
      }
    } else {
      sessionStorage.setItem("preloader_played", "true");
      if (typeof window !== "undefined") {
        (window as any).__preloaderFinished = true;
        window.dispatchEvent(new CustomEvent("preloader-finished"));
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!isActive) return;

    // Disable scrolling on load
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Clean up overflow styles in case component unmounts unexpectedly
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    // Show the skip hint after 1.0 second
    const hintTimer = setTimeout(() => {
      setShowSkipHint(true);
    }, 1000);

    // Fallback: If for any reason the video is stuck, close the preloader after 4 seconds
    const fallbackTimer = setTimeout(() => {
      handleClose();
    }, 4000);

    // Try to trigger play in case autoplay was restricted and speed it up
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.25;
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

    // Re-enable scrolling
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Notify window that preloader has completed
    if (typeof window !== "undefined") {
      (window as any).__preloaderFinished = true;
      window.dispatchEvent(new CustomEvent("preloader-finished"));
    }

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
