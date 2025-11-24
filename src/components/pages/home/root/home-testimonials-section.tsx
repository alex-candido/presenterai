import { cn } from "@/lib/utils";

export function HomeTestimonialsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("home-testimonials-section", className)}
      {...props}
    >
      {/* Social proof or user testimonials */}
    </section>
  );
}
