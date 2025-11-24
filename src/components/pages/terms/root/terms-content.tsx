import { cn } from "@/lib/utils";

export function TermsContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn("terms-content", className)}
      {...props}
    >
      {/* Main area for rendering the terms and policy text */}
    </main>
  );
}
