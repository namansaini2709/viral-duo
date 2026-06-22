import React from "react";
import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | The Viral Duo",
  description: "Read the Privacy Policy of The Viral Duo to understand how we collect, protect, and handle your professional information.",
};

export default function PrivacyPolicy() {
  return <PrivacyContent />;
}
