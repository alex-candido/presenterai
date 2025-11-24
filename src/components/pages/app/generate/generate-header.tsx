import { cn } from "@/lib/utils";

export function GenerateHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("generate-header", className)}
      {...props}
    >
      {/* Page Title, Save Button, Create Visual Button */}
    </header>
  );
}
