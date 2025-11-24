import { cn } from "@/lib/utils";

export function HomePricingSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("home-pricing-section", className)}
      {...props}
    >
      {/* Pricing tiers */}
    </section>
  );
}
