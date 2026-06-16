import { cn } from "@/lib/utils";

export function DocumentsStatsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-documents-stats-section", className)}
      {...props}
    >
      <h2>Document Statistics</h2>
      {/* Display statistics related to documents */}
    </section>
  );
}
