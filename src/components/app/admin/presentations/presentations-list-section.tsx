import { cn } from "@/lib/utils";

export function PresentationsListSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-presentations-list-section", className)}
      {...props}
    >
      <h2>Presentations List</h2>
      {/* Table or grid for listing presentations */}
    </section>
  );
}
