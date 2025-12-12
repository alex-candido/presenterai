import { cn } from "@/lib/utils";

export function AppFormControls({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("app-form-controls flex flex-col", className)}
      {...props}
    >
      PresentationControls
    </section>
  );
}
