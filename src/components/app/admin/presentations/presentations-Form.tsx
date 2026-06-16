import { cn } from "@/lib/utils";

export function PresentationsForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-presentations-form", className)}
      {...props}
    >
      <h2>Presentation Form</h2>
      {/* Form for creating or editing a presentation */}
    </section>
  );
}
