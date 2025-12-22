import { cn } from "@/lib/utils";

export function AppGenerateOutlinePanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("app-generate-outline-panel", className)}
      {...props}
    >
      pp-generate-outline-panel
    </main>
  );
}
