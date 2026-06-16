import { cn } from "@/lib/utils";

export function AppRecentsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("app-recents-section flex flex-col", className)}
      {...props}
    >
      presentationHeader
    </section>
  );
}
