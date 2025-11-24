import { cn } from "@/lib/utils";

export function HomeFAQSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("home-faq-section", className)}
      {...props}
    >
      {/* Frequently Asked Questions */}
    </section>
  );
}
