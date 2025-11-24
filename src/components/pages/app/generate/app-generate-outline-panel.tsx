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
      {/* Main outline editing UI will go here, switching between MULTI_PAGE and SINGLE_PAGE */}
    </main>
  );
}
