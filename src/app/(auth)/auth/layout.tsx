"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";
import { AuthLayoutBackground } from "@/components/pages/auth/layout/auth-layout-background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutApp id="auth" className="flex min-h-screen w-full flex-col bg-muted/40">
      <LayoutMain>
        <AuthLayoutBackground>{children}</AuthLayoutBackground>
      </LayoutMain>
    </LayoutApp>
  );
}
