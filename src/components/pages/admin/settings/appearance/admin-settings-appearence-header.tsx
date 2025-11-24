import { cn } from "@/lib/utils";

export function AdminSettingsAppearenceHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("admin-settings-appearence-header", className)}
      {...props}
    >
      <h1>AdminSettingsAppearenceHeader</h1>
    </header>
  );
}
