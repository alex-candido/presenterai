import { cn } from "@/lib/utils";

export function AuthLayoutBackground({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("auth-layout-background", className)}
      {...props}
    >
      <div className="min-h-[90vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
