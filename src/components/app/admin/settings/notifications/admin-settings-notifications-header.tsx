import { cn } from "@/lib/utils";

export function AdminSettingsNotificationsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-settings-notifications-header", className)}
      {...props}
    >
      <h1>AdminSettingsNotificationsHeader</h1>
    </header>
  );
}
