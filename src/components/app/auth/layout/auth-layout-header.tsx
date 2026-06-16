"use client";

import { LayoutContainer, LayoutHeader } from "@/components/layouts";
import { BaseLogo } from "@/components/ui/base";
import { cn } from "@/lib/utils";

export function AuthLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("auth-layout-header", className)}
      {...props}
    >
      <LayoutHeader>
        <LayoutContainer>
          <BaseLogo href="/" />
        </LayoutContainer>
      </LayoutHeader>
    </div>
  );
}
