"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";
import { DocsLayoutHeader, DocsLayoutSidebar } from "@/components/pages/docs/layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutApp
      id="docs"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <DocsLayoutSidebar />
      <div className="layout-wrapper">
        <DocsLayoutHeader />
        <LayoutMain>{children}</LayoutMain>
      </div>
    </LayoutApp>
  );
}
