"use client";

import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { HomeActionsMenu, HomeMobileMenu, HomeNavMenu } from "@/components/pages/home/root";
import { cn } from "@/lib/utils";

export function HomeLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("home-layout-header", className)}
      {...props}
    >
      <LayoutHeader>
        <LayoutContainer>
          <BaseLogo href="/" />
          <LayoutNavStart>
            <HomeNavMenu />
          </LayoutNavStart>
          <LayoutNavEnd>
            <HomeActionsMenu />
            <HomeMobileMenu />
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </header>
  );
}
