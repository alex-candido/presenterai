import { cn } from "@/lib/utils";

export function LandingHomeTestimonials({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("landing-home-testimonials", className)}
      {...props}
    >
      {/* Social proof or user testimonials */}
    </section>
  );
}
