import { cn } from "@/lib/utils";

export function AppSettingsPresentationsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("app-settings-presentations-header", className)}
      {...props}
    >
      {/* Presentation Title, Export Button, Share Button */}
    </header>
  );
}
