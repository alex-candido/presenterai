"use client";

import { ForgotPasswordSection } from "@/components/pages/auth/forgot-password";
import { AuthHero } from "@/components/pages/auth/root/auth-hero";

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page">
      <AuthHero />
      <ForgotPasswordSection />
    </div>
  );
}
