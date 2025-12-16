import { cn } from "@/lib/utils";

export function LayoutSection({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("layout-section pb-18 first:pt-16 first-of-type:pt-16", className)} {...props}>
      {children}
    </section>
  )
}
