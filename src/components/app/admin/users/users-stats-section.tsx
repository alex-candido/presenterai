import { cn } from "@/lib/utils";

export function UsersStatsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-users-stats-section", className)}
      {...props}
    >
      <h2>Users Statistics</h2>
      {/* Display statistics related to users */}
    </section>
  );
}
