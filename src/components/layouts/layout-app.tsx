import { cn } from "@/lib/utils";

export function LayoutApp({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main className={cn("layout-app", className)} {...props}>
      {children}
    </main>
  );
}
