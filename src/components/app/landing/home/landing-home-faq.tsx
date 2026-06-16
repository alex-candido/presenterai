import { LayoutContainer } from "@/components/layouts";
import { LayoutSection } from "@/components/layouts/layout-section";
import { cn } from "@/lib/utils";

export function LandingHomeFaq({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <LayoutSection>
      <LayoutContainer>
        <div className={cn("landing-home-faq", className)} {...props}>
          <p>landing-home-faq</p>
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}
