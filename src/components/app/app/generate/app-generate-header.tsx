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
      app-generate-header
    </header>
  );
}
