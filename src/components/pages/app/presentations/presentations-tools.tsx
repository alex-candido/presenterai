import { cn } from "@/lib/utils";

export function PresentationsTools({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("presentations-tools", className)}
      {...props}
    >
      {/* Tools and actions for the selected slide/visual */}
    </aside>
  );
}
