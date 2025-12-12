import { cn } from "@/lib/utils";

export function AppFormHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form-header flex flex-col", className)}
      {...props}
    >
      presentationHeader
    </div>
  );
}
