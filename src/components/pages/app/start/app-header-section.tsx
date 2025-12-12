import { cn } from "@/lib/utils";

export function AppHeaderSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("app-header-section flex flex-col", className)}
      {...props}
    >
      AppHeader
    </section>
  );
}
