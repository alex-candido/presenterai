'use client';

import { cn } from "@/lib/utils";

export function LayoutHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn("layout-header", className)} {...props}>
      {children}
    </header>
  );
}
