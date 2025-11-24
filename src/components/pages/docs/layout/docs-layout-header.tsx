import { cn } from "@/lib/utils";

export function DocsLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("docs-header", className)}
      {...props}
    >
      {/* Documentation Navigation and Search */}
    </header>
  );
}
