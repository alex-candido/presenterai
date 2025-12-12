import { cn } from "@/lib/utils";

export function AppSuggestionsSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("app-suggestions-section flex flex-col", className)}
      {...props}
    >
      SuggestionPresentations
    </section>
  );
}
