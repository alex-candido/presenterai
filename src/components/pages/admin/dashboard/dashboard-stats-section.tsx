import { cn } from "@/lib/utils";

export function DashboardStatsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-dashboard-stats-section", className)}
      {...props}
    >
      {/* Display key performance indicators or statistics */}
    </section>
  );
}
