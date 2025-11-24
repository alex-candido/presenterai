import { cn } from "@/lib/utils";

export function DashboardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-dashboard-header", className)}
      {...props}
    >
      <h1>Dashboard Overview</h1>
    </header>
  );
}
