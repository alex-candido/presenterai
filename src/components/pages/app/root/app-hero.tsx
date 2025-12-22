import { cn } from "@/lib/utils";

export function AppHero({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-hero flex flex-col", className)}
      {...props}
    >
      presentationHeader
    </div>
  );
}
