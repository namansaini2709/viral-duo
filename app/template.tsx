"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 
        This overlay expands on exit (from current page) 
        and shrinks on initial (to reveal new page).
      */}
      <motion.div
        variants={{
          initial: { clipPath: "circle(150% at 50% 50%)" },
          animate: { clipPath: "circle(0% at 50% 50%)" },
          exit: { clipPath: "circle(150% at 50% 50%)" },
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#ffa8f2",
          zIndex: 99999,
          pointerEvents: "none",
        }}
      />
      
      <motion.div
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
