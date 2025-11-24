import { cn } from "@/lib/utils";

export function UsersHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-users-header", className)}
      {...props}
    >
      <h1>Users Management</h1>
    </header>
  );
}
