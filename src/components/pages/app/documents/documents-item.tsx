import { cn } from "@/lib/utils";

export function DocumentsItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("documents-item", className)}
      {...props}
    >
      {/* A single document card with thumbnail and title */}
    </div>
  );
}
