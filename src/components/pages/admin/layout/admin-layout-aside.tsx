import { cn } from "@/lib/utils";

import { LayoutAside } from "@/components/layouts";

export function AdminLayoutAside({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("admin-aside flex flex-col", className)} {...props}>
      <LayoutAside />
    </div>
  );
}
