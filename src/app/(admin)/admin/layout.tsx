"use client";

import { AdminLayoutAside, AdminLayoutFooter, AdminLayoutHeader } from "@/components/app/admin/layout";
import { LayoutApp, LayoutMain } from "@/components/layouts";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutApp
      id="admin"
      className="flex min-h-screen w-full flex-col bg-muted/40"
    >
      <AdminLayoutAside />
      <div className="layout-wrapper">
        <AdminLayoutHeader />
        <LayoutMain>{children}</LayoutMain>
        <AdminLayoutFooter />
      </div>
    </LayoutApp>
  );
}
