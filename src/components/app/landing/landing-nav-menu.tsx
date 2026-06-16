import { cn } from "@/lib/utils";

export function LandingNavMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("landing-nav-menu", className)}
      {...props}
    >
      {/* Details about the key features of the product */}
    </div>
  );
}

