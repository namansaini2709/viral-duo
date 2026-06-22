import React from "react";
import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms and Conditions | The Viral Duo",
  description: "Read the Terms and Conditions of service for collaborating with The Viral Duo UGC and social media marketing agency.",
};

export default function TermsAndConditions() {
  return <TermsContent />;
}
