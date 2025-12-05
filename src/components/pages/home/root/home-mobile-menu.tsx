import { cn } from "@/lib/utils";

export function HomeMobileMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("home-mobile-menu", className)}
      {...props}
    >
      {/* header */}
      {/* content */}
      {/* footer */}
    </div>
  );
}
