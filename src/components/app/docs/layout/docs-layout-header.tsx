import { cn } from "@/lib/utils";

export function DocsLayoutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("docs-layout-header", className)}
      {...props}
    >
      docs-layout-header
    </header>
  );
}
