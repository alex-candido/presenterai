"use client";

import { LayoutApp, LayoutMain } from "@/components/layouts";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutApp
      id="terms"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <LayoutMain>{children}</LayoutMain>
    </LayoutApp>
  );
}
