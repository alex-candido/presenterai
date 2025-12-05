import { cn } from "@/lib/utils";

export function HomeNavMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("home-nav-menu", className)}
      {...props}
    >
      {/* Details about the key features of the product */}
    </div>
  );
}
