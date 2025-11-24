import { LayoutAside } from "@/components/layouts/aside";
import { cn } from "@/lib/utils";

export function AppLayoutAside({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("app-layout-aside flex flex-col", className)} {...props}>
      <LayoutAside />
    </div>
  );
}
