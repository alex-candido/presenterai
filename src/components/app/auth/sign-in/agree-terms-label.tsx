import { cn } from "@/lib/utils";
import Link from "next/link";

export function AgreeTermsLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("agree-terms-message", className)} {...props}>
      I agree to the{" "}
      <Link
        href="/legal/privacy-policy"
        className="underline underline-offset-4"
      >
        privacy policy
      </Link>{" "}and{" "}
      <Link
        href="/legal/terms-of-service"
        className="underline underline-offset-4"
      >
        terms of service
      </Link>
    </div>
  );
}
