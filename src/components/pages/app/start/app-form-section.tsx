import { cn } from "@/lib/utils";

import { AppFormControls, AppFormHeader, AppFormInput, AppFormMode } from "@/components/pages/app/start";

export function AppFormSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("app-form-section flex flex-col", className)}
      {...props}
    >
      <AppFormHeader />
      <AppFormMode />
      <AppFormInput />
      <AppFormControls />
    </section>
  );
}
