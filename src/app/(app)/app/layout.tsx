"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";
import { AppLayoutAside, AppLayoutFooter, AppLayoutHeader } from "@/components/pages/app/layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutApp
      id="app"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <AppLayoutAside />
      <div className="layout-wrapper">
        <AppLayoutHeader />
        <LayoutMain>{children}</LayoutMain>
        <AppLayoutFooter />
      </div>
    </LayoutApp>
  );
}
