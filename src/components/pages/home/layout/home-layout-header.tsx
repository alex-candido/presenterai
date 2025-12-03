"use client";

import { BaseLogo } from "@/components/base";
import { LayoutContainer, LayoutHeader, LayoutNavEnd, LayoutNavStart } from "@/components/layouts";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
            <Button asChild>
              <Link href="/auth/sign-in">
              Get Started
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/sign-up">
                Sign Up
              </Link>
            </Button>
          </LayoutNavEnd>
        </LayoutContainer>
      </LayoutHeader>
    </header>
  );
}
