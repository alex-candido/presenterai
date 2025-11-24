import { cn } from "@/lib/utils";

export function AppDocumentsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("app-documents-header", className)}
      {...props}
    >
      {/* Page Title and Create Button */}
    </header>
  );
}