import { cn } from "@/lib/utils";

export function DashboardRecentActivitySection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-dashboard-recent-activity-section", className)}
      {...props}
    >
      {/* List of recent user activities or system events */}
    </section>
  );
}
