"use client";

import { cn } from "@/lib/utils";

import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { AdminActionsMenu } from "../root";

export function AdminLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("admin-layout-header flex flex-col", className)} {...props}>
      <LayoutHeader>
        <LayoutContainer>
          <BaseLogo href="/" />
          <LayoutNavStart></LayoutNavStart>
          <LayoutNavEnd>
            <AdminActionsMenu />
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </div>
  );
}
