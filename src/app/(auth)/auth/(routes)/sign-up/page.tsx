"use client";

import { AuthHero } from "@/components/pages/auth/root/auth-hero";
import { SignUpSection } from "@/components/pages/auth/sign-up";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <AuthHero />
      <SignUpSection/>
    </div>
  );
}
