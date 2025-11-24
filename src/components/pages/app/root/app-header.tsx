import { cn } from "@/lib/utils";

export function AppHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-header flex flex-col", className)}
      {...props}
    >
      AppHeader
    </div>
  );
}
