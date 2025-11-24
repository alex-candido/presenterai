"use client";

import { ResetPasswordSection } from "@/components/pages/auth/reset-password";
import { AuthHero } from "@/components/pages/auth/root/auth-hero";

export default function ResetPasswordPage() {
  return (
    <div className="reset-password-page">
      <AuthHero />
      <ResetPasswordSection />
    </div>
  );
}
