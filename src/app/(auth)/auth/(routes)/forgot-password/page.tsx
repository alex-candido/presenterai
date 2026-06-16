"use client";

import { AuthHero } from "@/components/app/auth/auth-hero";
import { ForgotPasswordSection } from "@/components/app/auth/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page">
      <AuthHero />
      <ForgotPasswordSection />
    </div>
  );
}
