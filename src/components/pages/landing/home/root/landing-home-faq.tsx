import { cn } from "@/lib/utils";

export function LandingHomeFaq({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("Landing-home-faq", className)}
      {...props}
    >
      {/* Frequently Asked Questions */}
    </section>
  );
}
