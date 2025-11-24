import { cn } from "@/lib/utils";

export function AppFormMode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form-mode flex flex-col", className)}
      {...props}
    >
      PresentationMode
    </div>
  );
}
