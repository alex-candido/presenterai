import { cn } from "@/lib/utils";

export function LayoutApp({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div aria-description="presentarai-app" className={cn("layout-app", className)} {...props}>
      {children}
    </div>
  );
}
