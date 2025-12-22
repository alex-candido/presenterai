import { cn } from "@/lib/utils";

export function AppHeroSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("app-hero-section flex flex-col", className)}
      {...props}
    >
      app-hero-section
    </section>
  );
}
