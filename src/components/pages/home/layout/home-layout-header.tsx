"use client";

import { ButtonAdapter } from "@/components/adapters";
import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
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
          <LayoutNavStart></LayoutNavStart>
          <LayoutNavEnd>
            <ButtonAdapter to="/auth/sign-in">
              Get Started
            </ButtonAdapter>
            <ButtonAdapter variant="outline" to="/auth/sign-up">
              Sign Up
            </ButtonAdapter>
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </header>
  );
}
