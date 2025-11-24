"use client";

import { AuthHero } from "@/components/pages/auth/root/auth-hero";
import { SignInSection } from "@/components/pages/auth/sign-in";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <AuthHero />
      <SignInSection />
    </div>
  );
}
