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
}: ShiftButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseHeight = large ? 60 : small ? 42 : 48;
  const fontSize = large ? "20px" : small ? "14px" : "16px";
  const paddingX = large ? "80px" : small ? "20px" : "24px";

  // Default colors
  let defaultBg = dark ? "#000" : "#0048A1";
  let fontColor = "#FFFFFF";

  if (light) {
    defaultBg = "#FFFFFF";
    fontColor = "#000000";
  }

  const buttonContent = (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        gap: "6px",
        height: baseHeight,
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {/* LEFT ICON (Visible only on hover) */}
      {showIcon && (
        <motion.div
          initial={{ width: 0, opacity: 0, scale: 0.5 }}
          animate={{
            width: isHovered ? baseHeight : 0,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={springTransition}
          style={{
            height: baseHeight,
            borderRadius: "50%",
            backgroundColor: leftIconColor || defaultBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: fontColor,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <svg width={baseHeight * 0.4} height={baseHeight * 0.4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
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
          initial={{ width: baseHeight, opacity: 1, scale: 1 }}
          animate={{
            width: isHovered ? 0 : baseHeight,
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.5 : 1,
          }}
          transition={springTransition}
          style={{
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
        rel={rel}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={className}
      style={wrapperStyle}
    >
      {buttonContent}
    </button>
  );
}
