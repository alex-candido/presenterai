"use client";

import { cn } from "@/lib/utils";

import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { AppActionsMenu } from "../root/app-actions-menu";

export function AppLayoutHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("app-layout-header flex flex-col", className)} {...props}>
      <LayoutHeader>
        <LayoutContainer>
          <BaseLogo href="/" />
          <LayoutNavStart></LayoutNavStart>
          <LayoutNavEnd>
            <AppActionsMenu />
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </div>
  );
}
