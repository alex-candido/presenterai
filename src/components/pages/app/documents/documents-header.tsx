import { cn } from "@/lib/utils";

export function DocumentsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("documents-header", className)}
      {...props}
    >
      {/* Page Title and Create Button */}
    </header>
  );
}