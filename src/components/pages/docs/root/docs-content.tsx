import { cn } from "@/lib/utils";

export function DocsContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("docs-content", className)}
      {...props}
    >
      {/* Main area for rendering documentation content */}
    </main>
  );
}
