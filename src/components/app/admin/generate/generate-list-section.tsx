import { cn } from "@/lib/utils";

export function GenerateListSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-generate-list-section", className)}
      {...props}
    >
      <h2>Generations List</h2>
      {/* Table or grid for listing generations */}
    </section>
  );
}
