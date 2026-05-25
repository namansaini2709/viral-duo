"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

interface ShiftButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  target?: string;
  rel?: string;
  showIcon?: boolean;
  large?: boolean;
  small?: boolean;
  light?: boolean;
  leftIconColor?: string;
  rightIconColor?: string;
  disabled?: boolean;
  dataCalLink?: string;
  dataCalConfig?: string;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export default function ShiftButton({
  children,
  href,
  type,
  onClick,
  dark = false,
  className = "",
  style = {},
  fullWidth = false,
  target,
  rel,
  showIcon = true,
  large = false,
  small = false,
  light = false,
  leftIconColor,
  rightIconColor,
  disabled = false,
  dataCalLink,
  dataCalConfig,
}: ShiftButtonProps) {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseHeight = large ? (isMobile ? 52 : 60) : small ? 42 : 48;
  const fontSize = large ? (isMobile ? "16px" : "20px") : small ? "14px" : "16px";
  const paddingX = large ? (isMobile ? "32px" : "80px") : small ? "20px" : "24px";

  // Default colors
  let defaultBg = dark ? "#000" : "#0048A1";
  let fontColor = "#FFFFFF";

  if (light) {
    defaultBg = "#FFFFFF";
    fontColor = "#000000";
  }

  const buttonContent = (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        initial: { scale: 1, rotate: 0 },
        hover: { 
          scale: 1.03,
          rotate: 4,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        gap: "6px",
        height: baseHeight,
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {/* LEFT ICON (Visible only on hover) */}
      {showIcon && (
        <motion.div
          variants={{
            initial: { width: 0, opacity: 0, scale: 0.2, rotate: -120, y: 25, x: 0 },
            hover: { width: baseHeight, opacity: 1, scale: 1, rotate: 0, y: 25, x: 10 }
          }}
          transition={springTransition}
          style={{
            width: 0,
            height: baseHeight,
            borderRadius: "50%",
            backgroundColor: leftIconColor || defaultBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: fontColor,
            flexShrink: 0,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <svg 
            width={baseHeight * 0.4} 
            height={baseHeight * 0.4} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </motion.div>
      )}

      {/* TEXT PILL */}
      <motion.div
        animate={{
          flexGrow: fullWidth ? 1 : 0,
        }}
        transition={springTransition}
        style={{
          backgroundColor: defaultBg,
          borderRadius: baseHeight / 2,
          padding: `0 ${paddingX}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: baseHeight,
          minWidth: "min-content",
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: fontColor,
            fontWeight: 600,
            fontSize: fontSize,
            fontFamily: 'inherit',
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </span>
      </motion.div>

      {/* RIGHT ICON (Visible by default, hides on hover) */}
      {showIcon && (
        <motion.div
          variants={{
            initial: { width: baseHeight, opacity: 1, scale: 1, rotate: 0 },
            hover: { width: 0, opacity: 0, scale: 0.2, rotate: 120 }
          }}
          transition={springTransition}
          style={{
            width: baseHeight,
            height: baseHeight,
            borderRadius: "50%",
            backgroundColor: rightIconColor || defaultBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: fontColor,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <svg width={baseHeight * 0.4} height={baseHeight * 0.4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );

  const wrapperStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    outline: "none",
    display: "inline-block",
    width: fullWidth ? "100%" : "auto",
    textDecoration: "none",
    color: "inherit",
    ...style,
  };

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={wrapperStyle}
        target={target}
        rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
        data-cal-link={dataCalLink}
        data-cal-config={dataCalConfig}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={wrapperStyle}
      data-cal-link={dataCalLink}
      data-cal-config={dataCalConfig}
    >
      {buttonContent}
    </button>
  );
}
