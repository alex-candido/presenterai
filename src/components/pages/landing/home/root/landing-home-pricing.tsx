import { LayoutSection } from "@/components/layouts/layout-section";
import { cn } from "@/lib/utils";

export function LandingHomePricing({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <LayoutSection>
      <div className={cn("landing-home-pricing", className)} {...props}>
        <p>landing-home-pricing</p>
      </div>
    </LayoutSection>
  );
}
