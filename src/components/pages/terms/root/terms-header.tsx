import { cn } from "@/lib/utils";

export function TermsHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn("terms-header", className)}
      {...props}
    >
      <h1>Terms of Service & Privacy Policy</h1>
    </header>
  );
}
