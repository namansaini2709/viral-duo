import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ShiftButton from './ShiftButton';

interface NavbarProps {
  isAtTop: boolean;
  isHidden: boolean;
  navTheme: 'dark' | 'light';
  isOverFooter: boolean;
}

export default function Navbar({ isAtTop, isHidden, navTheme, isOverFooter }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  return (
    <>
    <motion.nav
      className="nav"
      initial={false}
      animate={{
        width: isAtTop ? "100%" : "auto",
        maxWidth: isAtTop ? "100%" : "700px",
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
        padding: isAtTop ? "8px 24px" : "6px 12px 6px 20px",
        color: isAtTop ? "#0b0b0a" : (navTheme === 'dark' ? "#f4f0e8" : "#0b0b0a"),
        opacity: isOverFooter ? 0 : (isHidden ? 0 : 1),
        pointerEvents: isOverFooter || isHidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="brand" href="/" onClick={(e) => { 
        if (pathname === '/') {
          e.preventDefault(); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
      }} style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo-v2.png" alt="The Viral Duo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '50%', border: '1px solid currentColor', padding: '2px' }} />
        The Viral Duo
      </a>
      <div className="navLinks" style={{ color: 'inherit' }}>
        <a href="/">Home</a>
        {isAboutPage ? (
          <>
            <a href="#vision">Vision</a>
            <a href="#gallery">Glimpse</a>
            <a href="#team">Team</a>
          </>
        ) : (
          <>
            <a href="/#work">Projects</a>
            <a href="/#services">Services</a>
            <a href="/about">About Us</a>
          </>
        )}
      </div>
      <ShiftButton small={true} dark={isAtTop ? false : (navTheme === 'light')} dataCalLink="theviralduo/15min" dataCalConfig='{"layout":"month_view"}' showIcon={false}>Book a call</ShiftButton>
      
      <button 
        className="menuToggle" 
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </motion.nav>

    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--paper)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 24px',
            color: 'var(--ink)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
            <a href="/" onClick={(e) => { 
              if (pathname === '/') {
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }
              setIsMobileMenuOpen(false);
            }} style={{ fontWeight: 900, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
              <img src="/logo-v2.png" alt="The Viral Duo Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '50%', border: '1px solid currentColor', padding: '2px' }} />
              The Viral Duo
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '32px', fontWeight: 700 }}>
            <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            {isAboutPage ? (
              <>
                <a href="#vision" onClick={() => setIsMobileMenuOpen(false)}>Vision</a>
                <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Glimpse</a>
                <a href="#team" onClick={() => setIsMobileMenuOpen(false)}>Team</a>
              </>
            ) : (
              <>
                <a href="/#work" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
                <a href="/#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                <a href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
              </>
            )}
            <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
