"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IconData {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  rotation: number;
}

interface FlyingIconsButtonProps {
  label?: string;
  buttonColor?: string;
  textColor?: string;
  hoverButtonColor?: string;
  hoverTextColor?: string;
  iconColor?: string;
  iconSize?: number;
  iconCount?: number;
  flySpeed?: number;
  fadeSpeed?: number;
  spreadDistance?: number;
  borderRadius?: number;
  padding?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function FlyingIconsButton({
  label = "Subscribe",
  buttonColor = "#0b0b0a",
  textColor = "#f4f0e8",
  hoverButtonColor = "#222",
  hoverTextColor = "#fff",
  iconColor = "#ffa8f2",
  iconSize = 32,
  iconCount = 10,
  flySpeed = 5.0,
  fadeSpeed = 5.0,
  spreadDistance = 80,
  borderRadius = 999,
  padding = "16px 32px",
  className = "",
  type = "button",
  fullWidth = false,
  disabled = false,
}: FlyingIconsButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [icons, setIcons] = useState<IconData[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconIdCounter = useRef(0);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current && isHovered) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastSpawnPos.current) {
        const dx = x - lastSpawnPos.current.x;
        const dy = y - lastSpawnPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 5) return; // Matches Framer's 5px threshold
      }

      lastSpawnPos.current = { x, y };

      const newIcon: IconData = {
        id: iconIdCounter.current++,
        startX: x,
        startY: y,
        angle: (Math.random() - 0.5) * 60, // Matches Framer's angle logic
        speed: 0.8 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 720,
      };

      setIcons((prev) => [...prev, newIcon]);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    lastSpawnPos.current = null;
    // Clear icons immediately on leave as per Framer's handleMouseLeave
    setIcons([]);
  };

  const handleAnimationComplete = (id: number) => {
    setIcons((prev) => prev.filter((icon) => icon.id !== id));
  };

  return (
    <div 
      style={{ 
        position: "relative", 
        display: fullWidth ? "block" : "inline-block",
        width: fullWidth ? "100%" : "auto"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type={type}
        disabled={disabled}
        className={className}
        style={{
          position: "relative",
          width: fullWidth ? "100%" : "auto",
          backgroundColor: isHovered ? hoverButtonColor : buttonColor,
          color: isHovered ? hoverTextColor : textColor,
          padding: padding,
          borderRadius: borderRadius,
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          overflow: "visible",
          transition: "background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
          fontSize: "16px",
          fontWeight: 600,
          zIndex: 2,
        }}
      >
        {label}
      </button>

      {icons.map((icon) => {
        const radians = (icon.angle * Math.PI) / 180;
        const distance = spreadDistance * 3; // Matches Framer's spread multiplier
        const x = Math.cos(radians) * distance;
        const y = Math.sin(radians) * distance;

        return (
          <motion.div
            key={icon.id}
            initial={{ x: icon.startX, y: icon.startY, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ 
              x: icon.startX + x, 
              y: icon.startY + y, 
              opacity: 0, 
              scale: 0.5, 
              rotate: icon.rotation 
            }}
            transition={{ 
              duration: flySpeed * icon.speed, 
              ease: "linear", // Linear ease for fly animation
              opacity: { duration: fadeSpeed * icon.speed }
            }}
            onAnimationComplete={() => handleAnimationComplete(icon.id)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={iconColor}>
              {/* Default envelope icon from Framer source */}
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
