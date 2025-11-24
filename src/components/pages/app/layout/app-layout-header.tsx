import { cn } from "@/lib/utils";

import { LayoutHeader } from "@/components/layouts";

export function AppLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("app-layout-header flex flex-col", className)} {...props}>
      <LayoutHeader />
    </div>
  );
}
