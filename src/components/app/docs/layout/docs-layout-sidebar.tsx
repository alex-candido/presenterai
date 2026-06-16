import { cn } from "@/lib/utils";

export function DocsLayoutSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("docs-layout-sidebar", className)}
      {...props}
    >
      docs-layout-sidebar
    </aside>
  );
}
