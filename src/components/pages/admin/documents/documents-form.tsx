import { cn } from "@/lib/utils";

export function DocumentsForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-documents-form", className)}
      {...props}
    >
      <h2>Document Form</h2>
      {/* Form for creating or editing a document */}
    </section>
  );
}
