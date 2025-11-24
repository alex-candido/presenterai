import { cn } from "@/lib/utils";

export function UsersListSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("admin-users-list-section", className)}
      {...props}
    >
      <h2>Users List</h2>
      {/* Table or grid for listing users */}
    </section>
  );
}
