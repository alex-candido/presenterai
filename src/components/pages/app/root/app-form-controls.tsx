import { cn } from "@/lib/utils";

export function AppFormControls({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form-controls flex flex-col", className)}
      {...props}
    >
      PresentationControls
    </div>
  );
}
