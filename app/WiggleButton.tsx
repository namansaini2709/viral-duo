import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface WiggleButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function WiggleButton({ children, href, className, onClick }: WiggleButtonProps) {
  const [isExploding, setIsExploding] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e);
    
    if (href) {
      e.preventDefault();
      setIsExploding(true);
      
      // Delay navigation to let the "explosion" animation play
      setTimeout(() => {
        if (href.startsWith('/') && !href.startsWith('/#')) {
          router.push(href);
        } else {
          const id = href.includes('#') ? href.split('#')[1] : '';
          if (id) {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.hash = id;
            }
          } else if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
        
        // Reset exploding state after the full sequence (0.8s) finishes
        setTimeout(() => setIsExploding(false), 800);
      }, 400);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.a
        href={href}
        className={className}
        onClick={handleClick}
        style={{ 
          display: 'inline-block', 
          cursor: 'pointer', 
          textDecoration: 'none',
          position: 'relative',
          zIndex: 2
        }}
        initial={{ rotate: 0, scale: 1, opacity: 1 }}
        animate={isExploding ? {
          scale: [1, 1.8, 2.5, 0.8, 1],
          opacity: [1, 0.8, 0, 0, 1],
          filter: ["blur(0px)", "blur(4px)", "blur(12px)", "blur(4px)", "blur(0px)"],
          transition: { 
            duration: 0.8, 
            times: [0, 0.2, 0.5, 0.7, 1],
            ease: "easeInOut" 
          }
        } : { rotate: 0, scale: 1, opacity: 1 }}
        whileHover={!isExploding ? {
          rotate: [0, -3, 3, -3, 3, 0],
          scale: 1.05,
          transition: { 
            duration: 0.4,
            ease: "easeInOut"
          }
        } : {}}
        whileTap={!isExploding ? { scale: 0.95 } : {}}
      >
        {children}
      </motion.a>

      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ 
              scale: 4, 
              opacity: 0,
              filter: "blur(20px)"
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '100px',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
