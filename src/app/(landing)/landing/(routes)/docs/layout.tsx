"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";
import { LandingDocsLayoutHeader, LandingDocsLayoutSidebar } from "@/components/pages/landing/docs/layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutApp
      id="landing-docs"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <LandingDocsLayoutSidebar />
      <div className="layout-wrapper">
        <LandingDocsLayoutHeader />
        <LayoutMain>{children}</LayoutMain>
      </div>
    </LayoutApp>
  );
}
