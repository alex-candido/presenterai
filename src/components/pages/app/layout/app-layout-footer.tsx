import { cn } from "@/lib/utils";

import { LayoutHeader } from "@/components/layouts";

export function AppLayoutFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("app-layout-footer flex flex-col", className)} {...props}>
      <LayoutHeader />
    </div>
  );
}
