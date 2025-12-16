import { LayoutSection } from "@/components/layouts/layout-section";
import { cn } from "@/lib/utils";

export function LandingHomeHero({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <LayoutSection>
      <div className={cn("landing-home-hero", className)} {...props}>
        <p>landing-home-hero</p>
      </div>
    </LayoutSection>
  );
}
