import { cn } from "@/lib/utils";

export function AppGenerateHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("app-generate-header", className)}
      {...props}
    >
      {/* Page Title, Save Button, Create Visual Button */}
    </header>
  );
}
