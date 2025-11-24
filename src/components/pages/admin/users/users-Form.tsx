import { cn } from "@/lib/utils";

export function UsersForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-users-form", className)}
      {...props}
    >
      <h2>User Form</h2>
      {/* Form for creating or editing a user */}
    </section>
  );
}
