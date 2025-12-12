import { cn } from "@/lib/utils";

export function LandingMobileMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("landing-mobile-menu", className)}
      {...props}
    >
      {/* header */}
      {/* content */}
      {/* footer */}
    </div>
  );
}
