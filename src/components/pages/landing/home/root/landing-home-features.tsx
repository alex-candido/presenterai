import { cn } from "@/lib/utils";

export function LandingHomeFeatures({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("landing-home-features", className)}
      {...props}
    >
      {/* Details about the key features of the product */}
    </section>
  );
}
