import { cn } from "@/lib/utils";

export function LayoutTopBanner({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("layout-top-banner h-16 border-b border-border flex items-center justify-between px-4 sticky top-0 backdrop-blur-sm z-10", className)} {...props}>
      {children}
    </div>
  )
}
