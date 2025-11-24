import { cn } from "@/lib/utils";

export function DashboardGenerationsSummarySection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-dashboard-generations-summary-section", className)}
      {...props}
    >
      {/* Summary of generation-related metrics */}
    </section>
  );
}
