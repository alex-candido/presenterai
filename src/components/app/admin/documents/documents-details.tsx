import { cn } from "@/lib/utils";

export function DocumentsDetails({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-documents-details", className)}
      {...props}
    >
      <h2>Document Details</h2>
      {/* Display detailed information about a single document */}
    </section>
  );
}
