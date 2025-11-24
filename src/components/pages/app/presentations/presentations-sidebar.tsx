import { cn } from "@/lib/utils";

export function PresentationsSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("presentations-sidebar", className)}
      {...props}
    >
      {/* Navigation for the workspace (e.g., slide list) */}
    </aside>
  );
}
