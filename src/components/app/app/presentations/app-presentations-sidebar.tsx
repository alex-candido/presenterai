import { cn } from "@/lib/utils";

export function AppPresentationsSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("app-presentations-sidebar", className)}
      {...props}
    >
      {/* Navigation for the workspace (e.g., slide list) */}
    </aside>
  );
}
