import { cn } from "@/lib/utils";

export function DashboardPresentationsSummarySection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-dashboard-presentations-summary-section", className)}
      {...props}
    >
      {/* Summary of user-related metrics */}
    </section>
  );
}
