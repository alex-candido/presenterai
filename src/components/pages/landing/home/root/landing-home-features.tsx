import { LayoutSection } from "@/components/layouts/layout-section";
import { cn } from "@/lib/utils";

export function LandingHomeFeatures({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <LayoutSection>
      <div className={cn("landing-home-features", className)} {...props}>
        <p>landing-home-features</p>
      </div>
    </LayoutSection>
  );
}
