import { cn } from "@/lib/utils";

export function HomeHeroSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("home-hero-section", className)}
      {...props}
    >
      {/* Main value proposition and call-to-action */}
    </section>
  );
}
