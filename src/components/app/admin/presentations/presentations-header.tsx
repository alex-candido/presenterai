import { cn } from "@/lib/utils";

export function PresentationsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-presentations-header", className)}
      {...props}
    >
      <h1>Presentations Management</h1>
    </header>
  );
}
