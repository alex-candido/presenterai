import { cn } from "@/lib/utils";

export function AppDocumentsToolbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-documents-toolbar", className)}
      {...props}
    >
      {/* Search Input and Filters */}
    </div>
  );
}
