"use client";

import { BaseLogo } from "@/components/base";
import { CustomSheetMobileMenu } from "@/components/custom";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { cn } from "@/lib/utils";
import { LandingActionsMenu, LandingNavMenu } from "../root";

export function LandingLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("landing-layout-header", className)}
      {...props}
    >
      <LayoutHeader>
        <LayoutContainer>
          <BaseLogo href="/" />
          <LayoutNavStart>
            <LandingNavMenu />
          </LayoutNavStart>
          <LayoutNavEnd>
            <LandingActionsMenu />
            <CustomSheetMobileMenu />
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </div>
  );
}
