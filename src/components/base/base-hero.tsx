import { cn } from "@/lib/utils";

export function BaseHero({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("base-hero", className)}
      {...props}
    >
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
