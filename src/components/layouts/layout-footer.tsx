"use client";

import { cn } from "@/lib/utils";

export function LayoutFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("layout-footer", className)} {...props}>
      {children}
    </footer>
  );
}
