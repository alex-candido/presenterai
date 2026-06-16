import { cn } from "@/lib/utils";

export function AppSettingsAccountHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("app-settings-profile-header", className)}
      {...props}
    >
      {/* Presentation Title, Export Button, Share Button */}
    </header>
  );
}
