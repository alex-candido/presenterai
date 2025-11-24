import { cn } from "@/lib/utils";

export function DashboardUserSummarySection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-dashboard-user-summary-section", className)}
      {...props}
    >
      {/* Summary of user-related metrics */}
    </section>
  );
}
