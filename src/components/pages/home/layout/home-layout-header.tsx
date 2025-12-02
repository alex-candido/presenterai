"use client";

import { BaseLogo } from "@/components/base";
import { ButtonCustom } from "@/components/custom";
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
            <ButtonCustom to="/auth/sign-in">
              Get Started
            </ButtonCustom>
            <ButtonCustom variant="outline" to="/auth/sign-up">
              Sign Up
            </ButtonCustom>
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </header>
  );
}
