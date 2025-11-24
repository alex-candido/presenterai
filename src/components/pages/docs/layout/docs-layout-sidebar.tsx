import { cn } from "@/lib/utils";

export function DocsLayoutSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("docs-sidebar", className)}
      {...props}
    >
      {/* Tree navigation for documentation sections */}
    </aside>
  );
}
