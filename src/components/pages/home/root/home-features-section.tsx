import { cn } from "@/lib/utils";

export function HomeFeaturesSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("home-features-section", className)}
      {...props}
    >
      {/* Details about the key features of the product */}
    </section>
  );
}
