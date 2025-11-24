import { cn } from "@/lib/utils";

import { LayoutHeader } from "@/components/layouts";

export function AdminLayoutFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("admin-aside flex flex-col", className)} {...props}>
      <LayoutHeader />
    </div>
  );
}
