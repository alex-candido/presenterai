import { cn } from "@/lib/utils";

export function DocumentsListSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-documents-list-section", className)}
      {...props}
    >
      <h2>Document List</h2>
      {/* Table or grid for listing documents */}
    </section>
  );
}
