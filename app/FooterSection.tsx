import React, { forwardRef } from 'react';
import ShiftButton from './ShiftButton';
import FlyingIconsButton from './FlyingIconsButton';
import WiggleButton from './WiggleButton';

interface FooterSectionProps {
  isRevealFixed: boolean;
}

const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(({ isRevealFixed }, ref) => {
  return (
    <div
      className="footerRevealWrapper"
      ref={ref}
      style={{
        position: isRevealFixed ? 'fixed' : 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 0
      }}
    >
      <footer className="footer">
        <div className="footerMain">
          <div className="footerLinksGrid">
            <div className="footerCol">
              <h3>CONTACT</h3>
              <a href="mailto:theviralduo0923@gmail.com" className="footerContactText">theviralduo0923@gmail.com</a>
              <p className="footerContactText">+91 77019 18603</p>
              <p className="footerContactText">+91 92051 97949</p>
            </div>

            <div className="footerCol">
              <h3>NAVIGATION</h3>
              <div className="footerNav">
                <WiggleButton href="#">Home</WiggleButton>
                <WiggleButton href="/#work">Projects</WiggleButton>
                <WiggleButton href="/about">About</WiggleButton>
                <WiggleButton href="/#contact">Contact</WiggleButton>
                <WiggleButton href="/#faq">FAQ</WiggleButton>
              </div>
            </div>

            <div className="footerCol">
              <h3>SERVICES</h3>
              <div className="footerNav">
                <WiggleButton href="/photoshoots">Product Photoshoots</WiggleButton>
                <WiggleButton href="/event-coverage">Event Coverage</WiggleButton>
              </div>
            </div>

            <div className="footerCol">
              <h3>LEGAL</h3>
              <div className="footerNav">
                <WiggleButton href="/privacy">Privacy Policy</WiggleButton>
                <WiggleButton href="/terms">Terms & Condition</WiggleButton>
              </div>
            </div>

            <div className="footerCol">
              <h3>FOLLOW US</h3>
              <div className="footerSocials">
                <div className="socialBtnWrapper">
                  <a href="https://www.instagram.com/theviralduo/?hl=en" target="_blank" rel="noopener noreferrer" className="socialBtn" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
                <div className="socialBtnWrapper">
                  <a href="https://www.facebook.com/share/14bgTEGnxeU/" target="_blank" rel="noopener noreferrer" className="socialBtn" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                </div>
                <div className="socialBtnWrapper">
                  <a href="https://www.linkedin.com/company/the-viral-duo/" target="_blank" rel="noopener noreferrer" className="socialBtn" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="footerLogoContainer">
            <div className="footerLogoIcon">
              <img src="/logo-v2.png" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <h1 className="footerLogo">The Viral Duo</h1>
          </div>
          <div className="footerBottomRow">
            <div className="footerCopyright">© 2026 THE VIRAL DUO. ALL RIGHTS RESERVED.</div>
          </div>
        </div>

        <div className="footerNewsletter">
          <h3>Newsletter</h3>
          <p>Sign up for our newsletter to stay up to date with the latest viral ideas and content.</p>
          <NewsletterForm />
        </div>
      </footer>
    </div>
  );
});

function NewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent fail for bots
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="newsletterSuccess" style={{ color: '#fbb6ed', padding: '10px 0' }}>
        Thanks for subscribing! Stay viral.
      </div>
    );
  }

  return (
    <form className="newsletterForm" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email address" 
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email for newsletter"
      />
      {/* Honeypot field - hidden from users */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input 
          type="text" 
          value={honeypot} 
          onChange={(e) => setHoneypot(e.target.value)} 
          tabIndex={-1} 
          autoComplete="off" 
        />
      </div>
      <FlyingIconsButton 
        type="submit" 
        fullWidth 
        label={status === 'loading' ? 'Subscribing...' : 'Subscribe'} 
        disabled={status === 'loading'}
      />
    </form>
  );
}

FooterSection.displayName = 'FooterSection';

export default FooterSection;
