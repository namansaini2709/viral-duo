"use client";

import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {"styles":{"branding":{"brandColor":"#0048A1"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </ErrorBoundary>
  );
}
