"use client";
import type { Metadata } from "next";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {"styles":{"branding":{"brandColor":"#0048A1"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
