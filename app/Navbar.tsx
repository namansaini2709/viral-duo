import React from 'react';
import { motion } from 'framer-motion';
import ShiftButton from './ShiftButton';

interface NavbarProps {
  isAtTop: boolean;
  isHidden: boolean;
  navTheme: 'dark' | 'light';
  isOverFooter: boolean;
}

export default function Navbar({ isAtTop, isHidden, navTheme, isOverFooter }: NavbarProps) {
  return (
    <motion.nav
      className="nav"
      initial={false}
      animate={{
        width: isAtTop ? "100%" : "calc(100% - 36px)",
        maxWidth: isAtTop ? "100%" : "1180px",
        borderRadius: isAtTop ? "0px" : "999px",
        top: isAtTop ? "0px" : (isHidden ? "-100px" : "18px"),
        x: "-50%",
        left: "50%",
        background: isAtTop
          ? "rgba(244, 240, 232, 0)"
          : (navTheme === 'dark' ? "rgba(11, 11, 10, 0.95)" : "rgba(244, 240, 232, 0.95)"),
        borderColor: isAtTop
          ? "rgba(0,0,0,0)"
          : (navTheme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(11, 11, 10, 0.1)"),
        padding: isAtTop ? "12px 40px" : "6px 10px 6px 20px",
        color: isAtTop ? "#0b0b0a" : (navTheme === 'dark' ? "#f4f0e8" : "#0b0b0a"),
        opacity: isOverFooter ? 0 : (isHidden ? 0 : 1),
        pointerEvents: isOverFooter || isHidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="brand" href="#" style={{ color: 'inherit' }}>The Viral Duo</a>
      <div className="navLinks" style={{ color: 'inherit' }}>
        <a href="#work">Projects</a>
        <a href="#services">Services</a>
        <a href="#faq">FAQ</a>
      </div>
      <ShiftButton dark={isAtTop ? false : (navTheme === 'light')} href="#contact" showIcon={false}>Book a call</ShiftButton>
    </motion.nav>
  );
}
