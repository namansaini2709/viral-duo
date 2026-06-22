"use client";

import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import { useEffect, useState, useCallback } from "react";
import { getCalApi } from "@calcom/embed-react";
import Preloader from "./Preloader";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronize DOM state with React state
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isModalOpen) {
      const scrollY = window.scrollY;
      body.setAttribute('data-modal-open', 'true');
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
      html.style.overflow = 'hidden';
    } else {
      const scrollY = body.style.top;
      body.removeAttribute('data-modal-open');
      
      // Force instant jump by disabling smooth scroll temporarily
      html.style.scrollBehavior = 'auto';
      
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      html.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      // Restore scroll behavior for the rest of the site
      requestAnimationFrame(() => {
        html.style.scrollBehavior = '';
      });
    }
  }, [isModalOpen]);

  const checkModalPresence = useCallback(() => {
    // 1. Strictly look for Cal.com iframes that are actually visible
    const calIframes = Array.from(document.querySelectorAll('iframe[src*="cal.com"]')).some(iframe => {
      const s = window.getComputedStyle(iframe);
      const rect = iframe.getBoundingClientRect();
      return s.display !== 'none' && 
             s.visibility !== 'hidden' && 
             s.opacity !== '0' &&
             rect.width > 100 &&
             rect.height > 100;
    });

    if (calIframes) return true;

    // 2. Check for other large, fixed overlays (Generic detection)
    // IMPORTANT: We MUST ignore our own backdrop and content wrapper
    const hasLargeOverlay = Array.from(document.body.children).some(el => {
      // Skip known non-modal elements
      if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return false;
      if (el.id === 'content-wrapper' || el.id === 'jetski-backdrop') return false;
      if (el.id?.includes('__next') || el.className?.includes('nextjs')) return false;
      
      const s = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      const isFixed = s.position === 'fixed' || s.position === 'absolute';
      const isHighZ = parseInt(s.zIndex) > 100;
      const isLarge = rect.width > window.innerWidth * 0.4;
      const isVisible = s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';

      // If it's a component container, we need to check if it has the backdrop inside it
      if (el.querySelector('#jetski-backdrop')) return false;

      return isFixed && isHighZ && isLarge && isVisible;
    });

    return hasLargeOverlay;
  }, []);

  useEffect(() => {
    // Initialize Cal.com
    (async function init() {
      try {
        const cal = await getCalApi({});
        if (cal) {
          cal("ui", { "styles": { "branding": { "brandColor": "#0048A1" } }, "hideEventTypeDetails": false, "layout": "month_view" });
          cal("on", { action: "modalOpened" as any, callback: () => setIsModalOpen(true) });
          cal("on", { action: "modalClosed" as any, callback: () => setIsModalOpen(false) });
        }
      } catch (e) { console.error(e); }
    })();

    // Message Listener (Fallback)
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        if (e.data.includes("modalOpened")) setIsModalOpen(true);
        if (e.data.includes("modalClosed")) setIsModalOpen(false);
      }
    };
    window.addEventListener("message", onMessage);

    // Mutation Observer (Deep detection)
    const observer = new MutationObserver(() => {
      const active = checkModalPresence();
      setIsModalOpen(active);
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['style', 'class', 'hidden'] 
    });

    // Safety Interval (Prevents getting stuck)
    const interval = setInterval(() => {
      const active = checkModalPresence();
      if (active !== isModalOpen) setIsModalOpen(active);
    }, 500);

    return () => {
      window.removeEventListener("message", onMessage);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isModalOpen, checkModalPresence]);

  return (
    <ErrorBoundary>
      <Preloader />

      {/* Visual Backdrop Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            id="jetski-backdrop"
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(16px) brightness(0.6)',
              zIndex: 999998,
              pointerEvents: 'all',
              cursor: 'pointer'
            }}
          />
        )}
      </AnimatePresence>

      <div 
        id="content-wrapper" 
        style={{ 
          transition: 'all 0.4s ease',
          pointerEvents: isModalOpen ? 'none' : 'auto',
          userSelect: isModalOpen ? 'none' : 'auto',
          filter: isModalOpen ? 'blur(4px)' : 'none',
          backgroundColor: '#f8fafc',
          minHeight: '100vh'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={pathname} style={{ width: "100%", minHeight: "100vh" }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
