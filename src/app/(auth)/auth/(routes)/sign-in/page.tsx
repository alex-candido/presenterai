"use client";

import { AuthHero } from "@/components/app/auth/auth-hero";
import { SignInSection } from "@/components/app/auth/sign-in";

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <AuthHero />
      <SignInSection />
    </div>
  );
}
