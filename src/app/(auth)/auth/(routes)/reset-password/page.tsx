"use client";

import { AuthHero } from "@/components/app/auth/auth-hero";
import { ResetPasswordSection } from "@/components/app/auth/reset-password";

export default function ResetPasswordPage() {
  return (
    <div className="reset-password-page">
      <AuthHero />
      <ResetPasswordSection />
    </div>
  );
}
