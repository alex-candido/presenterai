import { cn } from "@/lib/utils";

export function PresentationsStatsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-presentations-stats-section", className)}
      {...props}
    >
      <h2>Presentations Statistics</h2>
      {/* Display statistics related to presentations */}
    </section>
  );
}
