import { cn } from "@/lib/utils";

export function GenerateHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-generate-header", className)}
      {...props}
    >
      <h1>Generations Management</h1>
    </header>
  );
}
