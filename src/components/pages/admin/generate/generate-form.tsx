import { cn } from "@/lib/utils";

export function GenerateForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-generate-form", className)}
      {...props}
    >
      <h2>Generation Form</h2>
      {/* Form for creating or editing a generation */}
    </section>
  );
}
