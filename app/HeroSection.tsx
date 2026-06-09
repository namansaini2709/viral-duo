import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import HeroStack from './HeroStack';
import ShiftButton from './ShiftButton';
import { img } from './data';

// Brand projects data for the cyclic hero widget
const heroProjects = [
  {
    logo: "/logos/Sharma ji ke bhature.JPG",
    title: "Making food reels that poora Dilli craves! 😋",
    tag: "FOOD CRUSH 😋"
  },
  {
    logo: "/logos/Shri radhey Krishna  jewellers.JPG",
    title: "Making luxury jewellery designs shine on social! ✨",
    tag: "GOLD CLASS ✨"
  },
  {
    logo: "/logos/FOF Fitnesa logo.jpeg",
    title: "Creating high-energy reels that drive gym sign-ups! 💪",
    tag: "GYM JOSH 💪"
  },
  {
    logo: "/logos/Global Holidays.PNG",
    title: "Creating travel loops that inspire bags to pack! ✈️",
    tag: "WANDERLUST ✈️"
  },
  {
    logo: "/logos/Vdmc logo.JPG",
    title: "Creating mouth-watering reels for VDMC Malai Chaap! 🍽️",
    tag: "DELICIOUS LIFT 🍽️"
  }
];

// Explicitly typed variants to satisfy Framer Motion type rules
const wordVariants: Variants = {
  hidden: { 
    marginRight: "0px" 
  },
  visible: {
    marginRight: "10px",
    transition: {
      duration: 0.4,
      delay: 0.6,
      ease: "easeInOut"
    }
  }
};

const subVariants: Variants = {
  hidden: { 
    width: 0, 
    opacity: 0,
    marginRight: "0px"
  },
  visible: { 
    width: "auto", 
    opacity: 1,
    marginRight: "4px",
    transition: { 
      width: { duration: 0.6, delay: 1.1, ease: "easeOut" },
      opacity: { duration: 0.4, delay: 1.3, ease: "easeOut" }
    }
  }
};

export default function HeroSection() {
  const [projectIndex, setProjectIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isPageTransitionActive, setIsPageTransitionActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % heroProjects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__preloaderFinished) {
      setIsPreloaderActive(false);
      if (window.scrollY < 100) {
        setIsInView(true);
      }
    } else {
      const handlePreloaderFinished = () => {
        setIsPreloaderActive(false);
        if (window.scrollY < 100) {
          setIsInView(true);
        }
      };
      window.addEventListener('preloader-finished', handlePreloaderFinished);
      return () => {
        window.removeEventListener('preloader-finished', handlePreloaderFinished);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).__pageTransitionActive) {
      setIsPageTransitionActive(false);
      if (window.scrollY < 100) {
        setIsInView(true);
      }
    } else {
      const handleTransitionFinished = () => {
        setIsPageTransitionActive(false);
        if (window.scrollY < 100) {
          setIsInView(true);
        }
      };
      window.addEventListener('page-transition-finished', handleTransitionFinished);
      return () => {
        window.removeEventListener('page-transition-finished', handleTransitionFinished);
      };
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const showAnimation = isInView && !isPreloaderActive && !isPageTransitionActive;

  return (
    <section ref={sectionRef} className={`hero section ${showAnimation ? 'in-view' : ''}`} id="home">
      <div className="heroTitle">
        <h1>
          {/* Parent container triggering the animation sequence every time it enters the viewport */}
          <motion.span 
            className="hero-ugc-container"
            initial="hidden"
            animate={showAnimation ? "visible" : "hidden"}
          >
            {/* Word 1: User */}
            <motion.span className="hero-ugc-word" variants={wordVariants}>
              <span className="hero-ugc-cap">U</span>
              <motion.span className="hero-ugc-sub" variants={subVariants}>ser</motion.span>
            </motion.span>

            {/* Word 2: Generated */}
            <motion.span className="hero-ugc-word" variants={wordVariants}>
              <span className="hero-ugc-cap">G</span>
              <motion.span className="hero-ugc-sub" variants={subVariants}>enerated</motion.span>
            </motion.span>

            {/* Word 3: Content */}
            <motion.span className="hero-ugc-word" variants={wordVariants}>
              <span className="hero-ugc-cap">C</span>
              <motion.span className="hero-ugc-sub" variants={subVariants}>ontent</motion.span>
            </motion.span>
          </motion.span>
          <br />
          that grows your brand.
        </h1>
        <ul>
          <li>SHORT FORM CONTENT</li>
          <li>SOCIAL MEDIA MANAGEMENT</li>
          <li>INFLUENCER MARKETING</li>
        </ul>
      </div>
      <div className="heroRibbonContainer" style={{ top: '44%' }}>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="heroRibbonSvg">
          <defs>
            <path id="ribbonPath" d="M 0 100 C 250 220, 250 220, 500 100 S 750 -20, 1000 100" />
          </defs>
          <use href="#ribbonPath" fill="none" stroke="#F472B6" strokeWidth="28" strokeLinecap="round" />
          <text className="heroRibbonText" style={{ fontSize: '11px' }}>
            <textPath href="#ribbonPath" startOffset="0%">
              {Array(6).fill("SOCIAL MEDIA MANAGEMENT • SHORT FORM CONTENT • INFLUENCER MARKETING • ").join("")}
              <animate attributeName="startOffset" from="0%" to="-100%" dur="20s" repeatCount="indefinite" />
            </textPath>
          </text>
        </svg>
      </div>
      <HeroStack 
        slides={[
          { src: img.work3, poster: "/Cover pages/inder chahal.20.49 AM.jpeg" },
          { src: img.phone1, poster: "/Cover pages/Fof fitness.png" },
          { src: img.phone2, poster: "/Cover pages/Global Holidays.png" },
          { src: img.phone3, poster: "/Cover pages/Vdmc.PNG" },
          { src: img.work1, poster: "/Cover pages/Shri Radhey Krishna Cover.PNG" },
          { src: img.work2, poster: "/logos/Make your trip possible.jpg" }
        ]} 
      />
      
      {/* Brand-Cycling Responsive Widget */}
      <div className="heroProject">
        <motion.div
          key={projectIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ display: 'contents' }}
        >
          {(() => {
            const currentProject = heroProjects[projectIndex] || heroProjects[0];
            return (
              <>
                <div className="heroProjectLogoWrapper">
                  <img 
                    src={currentProject.logo} 
                    alt={`${currentProject.title} client logo`} 
                  />
                </div>
                <div>
                  <p>{currentProject.tag}</p>
                  <b>{currentProject.title}</b>
                </div>
              </>
            );
          })()}
        </motion.div>
      </div>

      <div className="heroIntroCopy">
        <p>The Viral Duo helps brands create content that truly connects with their audience, consistently and strategically across social media.</p>
        <ShiftButton dark dataCalLink="theviralduo/15min" dataCalConfig='{"layout":"month_view"}' large leftIconColor="#A78BFA" rightIconColor="#F472B6">Book a call</ShiftButton>
      </div>
    </section>
  );
}
