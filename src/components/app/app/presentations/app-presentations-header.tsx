import { cn } from "@/lib/utils";

export function AppPresentationsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("app-presentations-header", className)}
      {...props}
    >
      {/* Presentation Title, Export Button, Share Button */}
    </header>
  );
}
