import { cn } from "@/lib/utils";
import { AppFormControls } from "./app-form-controls";

export function AppForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form flex flex-col", className)}
      {...props}
    >
      app-form
      <AppFormControls />
    </div>
  );
}
