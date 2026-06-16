import { cn } from "@/lib/utils";

export function AdminSettingsProfileHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-settings-profile-header", className)}
      {...props}
    >
      <h1>AdminSettingsProfileHeader</h1>
    </header>
  );
}
