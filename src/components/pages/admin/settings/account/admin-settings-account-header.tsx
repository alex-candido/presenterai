import { cn } from "@/lib/utils";

export function AdminSettingsAccountHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-settings-account-header", className)}
      {...props}
    >
      <h1>AdminSettingsAccountHeader</h1>
    </header>
  );
}
