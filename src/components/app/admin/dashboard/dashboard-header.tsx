import { cn } from "@/lib/utils";

export function DashboardHeaderSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-dashboard-header-section", className)}
      {...props}
    >
      <h1>Dashboard Overview</h1>
    </section>
  );
}
