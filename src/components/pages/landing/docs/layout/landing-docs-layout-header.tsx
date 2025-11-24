import { cn } from "@/lib/utils";

export function LandingDocsLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("landing-docs-layout-header", className)}
      {...props}
    >
      {/* Documentation Navigation and Search */}
    </header>
  );
}
