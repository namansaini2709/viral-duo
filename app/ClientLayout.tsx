"use client";

import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </ErrorBoundary>
  );
}
