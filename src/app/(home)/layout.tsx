"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";
import { HomeLayoutFooter, HomeLayoutHeader } from "@/components/pages/home/layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutApp
      id="home"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <div className="layout-container">
        <HomeLayoutHeader />
        <LayoutMain>{children}</LayoutMain>
        <HomeLayoutFooter />
      </div>
    </LayoutApp>
  );
}
