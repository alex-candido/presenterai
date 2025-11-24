import { cn } from "@/lib/utils";

export function HomeLayoutFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("home-layout-footer", className)}
      {...props}
    >
      {/* Landing Page Footer */}
    </footer>
  );
}
