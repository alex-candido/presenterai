import { cn } from "@/lib/utils";

export function AppPresentationsTools({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("app-presentations-tools", className)}
      {...props}
    >
      {/* Tools and actions for the selected slide/visual */}
    </aside>
  );
}
