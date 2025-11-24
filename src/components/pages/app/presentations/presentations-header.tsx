import { cn } from "@/lib/utils";

export function PresentationsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("presentations-header", className)}
      {...props}
    >
      {/* Presentation Title, Export Button, Share Button */}
    </header>
  );
}
