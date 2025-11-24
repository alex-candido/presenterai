import { cn } from "@/lib/utils";

export function LandingHomePricing({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("landing-home-pricing", className)}
      {...props}
    >
      {/* Pricing tiers */}
    </section>
  );
}
