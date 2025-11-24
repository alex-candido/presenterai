import { cn } from "@/lib/utils";

export function DocumentsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-documents-header", className)}
      {...props}
    >
      <h1>Document Management</h1>
    </header>
  );
}
