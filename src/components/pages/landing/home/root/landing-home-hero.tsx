import { cn } from "@/lib/utils";

export function LandingHomeHero({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("landing-home-hero", className)}
      {...props}
    >
      {/* Main value proposition and call-to-action */}
    </section>
  );
}
