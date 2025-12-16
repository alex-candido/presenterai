import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LandingCtaMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("landing-cta-menu flex items-center gap-2", className)} {...props}>
      <Button variant="outline" asChild className="cursor-pointer">
        <Link href="/auth/sign-in">Sign In</Link>
      </Button>
      <Button asChild className="cursor-pointer">
        <Link href="/auth/sign-up">Get Started</Link>
      </Button>
    </div>
  );
}