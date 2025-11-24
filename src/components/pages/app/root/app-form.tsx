import { cn } from "@/lib/utils";

import { AppFormControls, AppFormHeader, AppFormInput, AppFormMode } from "@/components/pages/app/root";

export function AppForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-form flex flex-col", className)}
      {...props}
    >
      <AppFormHeader />
      <AppFormMode />
      <AppFormInput />
      <AppFormControls />
    </div>
  );
}
