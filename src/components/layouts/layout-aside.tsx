import { cn } from "@/lib/utils";

export function LayoutAside({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside className={cn("layout-aside flex flex-col", className)} {...props}>
      {children}
    </aside>
  );
}
