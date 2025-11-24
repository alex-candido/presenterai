import { cn } from "@/lib/utils";

export function GenerateOutlinePanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("generate-outline-panel", className)}
      {...props}
    >
      {/* Main outline editing UI will go here, switching between MULTI_PAGE and SINGLE_PAGE */}
    </main>
  );
}
