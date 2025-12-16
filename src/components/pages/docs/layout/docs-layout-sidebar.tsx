import { cn } from "@/lib/utils";

export function LandingDocsLayoutSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("landing-docs-layout-sidebar", className)}
      {...props}
    >
      {/* Tree navigation for documentation sections */}
    </aside>
  );
}
