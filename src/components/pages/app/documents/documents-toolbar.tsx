import { cn } from "@/lib/utils";

export function DocumentsToolbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("documents-toolbar", className)}
      {...props}
    >
      {/* Search Input and Filters */}
    </div>
  );
}
