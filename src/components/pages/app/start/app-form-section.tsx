import { cn } from "@/lib/utils";
import { AppForm } from "./app-form";

export function AppFormSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form-section flex flex-col", className)}
      {...props}
    >
      <AppForm />
    </div>
  );
}
