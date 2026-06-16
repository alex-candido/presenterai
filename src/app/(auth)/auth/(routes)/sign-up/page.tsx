"use client";

import { AuthHero } from "@/components/app/auth/auth-hero";
import { SignUpSection } from "@/components/app/auth/sign-up";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <AuthHero />
      <SignUpSection/>
    </div>
  );
}
