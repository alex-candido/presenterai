import { cn } from "@/lib/utils";

export function PresentationsDetails({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-presentations-details", className)}
      {...props}
    >
      <h2>Presentation Details</h2>
      {/* Display detailed information about a single presentation */}
    </section>
  );
}
