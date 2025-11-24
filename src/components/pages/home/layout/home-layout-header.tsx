import { cn } from "@/lib/utils";

export function HomeLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("home-layout-header", className)}
      {...props}
    >
      {/* Landing Page Navigation */}
    </header>
  );
}
