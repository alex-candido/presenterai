import { cn } from "@/lib/utils";

export function AppRecents({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-recents flex flex-col", className)}
      {...props}
    >
      presentationHeader
    </div>
  );
}
