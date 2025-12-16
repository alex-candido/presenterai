"use client";

import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { cn } from "@/lib/utils";
import { LandingActionsMenu, LandingMobileMenu, LandingNavMenu } from "../root";

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
            <LandingMobileMenu />
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </div>
  );
}
