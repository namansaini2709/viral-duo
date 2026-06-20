import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
        width: "92%",
        maxWidth: "1200px",
        borderRadius: isAtTop ? "0px 0px 20px 20px" : "20px",
        top: isAtTop ? "0px" : (isHidden ? "-100px" : "14px"),
        x: "-50%",
        left: "50%",
        background: isAtTop
          ? "rgba(11, 11, 10, 1)"
          : (navTheme === 'dark' ? "rgba(11, 11, 10, 0.95)" : "rgba(248, 250, 252, 0.95)"),
        borderColor: isAtTop
          ? "rgba(255, 255, 255, 0.1)"
          : (navTheme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(11, 11, 10, 0.1)"),
        padding: "12px 28px",
        color: isAtTop ? "#f8fafc" : (navTheme === 'dark' ? "#f8fafc" : "#0b0b0a"),
        opacity: isOverFooter ? 0 : (isHidden ? 0 : 1),
        pointerEvents: isOverFooter || isHidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link className="brand" href={isAboutPage ? "/about" : "/"} onClick={(e) => { 
        if (isAboutPage && pathname === '/about') {
          e.preventDefault(); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        } else if (!isAboutPage && pathname === '/') {
          e.preventDefault(); 
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
      }} style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo-v2.png?v=4" alt="The Viral Duo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        The Viral Duo
      </Link>
      <div className="navLinks" style={{ color: 'inherit' }}>
        <Link href="/">Home</Link>
        <Link href="/photoshoots">Photoshoots</Link>
        <Link href="/event-coverage">Event Coverage</Link>
        <Link href="/about">About Us</Link>
      </div>
      <ShiftButton 
        small={true} 
        dark={isAtTop ? false : (navTheme === 'light')} 
        light={isAtTop ? true : (navTheme === 'dark')}
        dataCalLink="theviralduo/15min" 
        dataCalConfig='{"layout":"month_view"}' 
        showIcon={false}
      >
        Book a call
      </ShiftButton>
      
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
            <Link href={isAboutPage ? "/about" : "/"} onClick={(e) => { 
              if (isAboutPage && pathname === '/about') {
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              } else if (!isAboutPage && pathname === '/') {
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }
              setIsMobileMenuOpen(false);
            }} style={{ fontWeight: 900, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
              <img src="/logo-v2.png?v=4" alt="The Viral Duo Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              The Viral Duo
            </Link>
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
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/photoshoots" onClick={() => setIsMobileMenuOpen(false)}>Photoshoots</Link>
            <Link href="/event-coverage" onClick={() => setIsMobileMenuOpen(false)}>Event Coverage</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
