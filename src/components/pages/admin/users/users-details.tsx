import { cn } from "@/lib/utils";

export function UsersDetails({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-users-details", className)}
      {...props}
    >
      <h2>User Details</h2>
      {/* Display detailed information about a single user */}
    </section>
  );
}
