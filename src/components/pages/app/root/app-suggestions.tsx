import { cn } from "@/lib/utils";

export function AppSuggestions({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("app-suggestions flex flex-col", className)}
      {...props}
    >
      SuggestionPresentations
    </div>
  );
}
