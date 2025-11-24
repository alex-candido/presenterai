"use client";

import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { cn } from "@/lib/utils";
import { LandingActionsMenu } from "./landing-actions-menu";
import { LandingMobileMenu } from "./landing-mobile-menu";
import { LandingNavMenu } from "./landing-nav-menu";

export function LandingLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
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
    </header>
  );
}
