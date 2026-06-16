"use client";

import { LandingLayoutAppEntryBanner, LandingLayoutFooter, LandingLayoutHeader } from "@/components/app/landing/layout";
import { LayoutApp, LayoutMain } from "@/components/layouts";

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
