import { cn } from "@/lib/utils";

export function GenerateSettingsPanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("generate-settings-panel", className)}
      {...props}
    >
      {/* Sidebar with global settings for the generation */}
    </aside>
  );
}
