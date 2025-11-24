import { cn } from "@/lib/utils";

export function GenerateStatsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-generate-stats-section", className)}
      {...props}
    >
      <h2>Generations Statistics</h2>
      {/* Display statistics related to generations */}
    </section>
  );
}
