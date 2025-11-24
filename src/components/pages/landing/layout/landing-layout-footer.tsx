import { cn } from "@/lib/utils";

export function LandingLayoutFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("landing-layout-footer", className)}
      {...props}
    >
      {/* Landing Page Footer */}
    </footer>
  );
}
