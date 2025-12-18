import { LayoutContainer } from "@/components/layouts";
import { LayoutSection } from "@/components/layouts/layout-section";
import { cn } from "@/lib/utils";

export function LandingHomeTestimonials({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <LayoutSection>
      <LayoutContainer>
        <div className={cn("landing-home-testimonials", className)} {...props}>
          <p>landing-home-testimonials</p>
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}
