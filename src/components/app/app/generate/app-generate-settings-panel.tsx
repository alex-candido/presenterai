import { cn } from "@/lib/utils";

export function AppGenerateSettingsPanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("app-generate-settings-panel", className)}
      {...props}
    >
      app-generate-settings-panel
    </aside>
  );
}
