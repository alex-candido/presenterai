import { cn } from "@/lib/utils";

export function AppDocumentsItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-documents-item", className)}
      {...props}
    >
      {/* A single document card with thumbnail and title */}
    </div>
  );
}
