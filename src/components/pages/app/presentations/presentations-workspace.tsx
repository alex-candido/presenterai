import { cn } from "@/lib/utils";

export function PresentationsWorkspace({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("presentations-workspace", className)}
      {...props}
    >
      {/* Excalidraw canvas will be embedded here */}
    </main>
  );
}
