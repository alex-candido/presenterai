import { cn } from "@/lib/utils";

export function AppFormInput({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form-input flex flex-col", className)}
      {...props}
    >
      PresentationInput
    </div>
  );
}
