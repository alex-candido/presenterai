"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";
import { LandingLayoutAppEntryBanner, LandingLayoutFooter, LandingLayoutHeader } from "@/components/pages/landing/layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutApp
      id="landing"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <div className="layout-wrapper">
        <LandingLayoutHeader />
        <LandingLayoutAppEntryBanner />
        <LayoutMain>{children}</LayoutMain>
        <LandingLayoutFooter />
      </div>
    </LayoutApp>
  );
}
