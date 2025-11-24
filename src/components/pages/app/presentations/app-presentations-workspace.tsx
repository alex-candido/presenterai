import { cn } from "@/lib/utils";

export function AppPresentationsWorkspace({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("app-presentations-workspace", className)}
      {...props}
    >
      {/* Excalidraw canvas will be embedded here */}
    </main>
  );
}
