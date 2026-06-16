import { cn } from "@/lib/utils";

export function GenerateDetails({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-generate-details", className)}
      {...props}
    >
      <h2>Generation Details</h2>
      {/* Display detailed information about a single generation */}
    </section>
  );
}
