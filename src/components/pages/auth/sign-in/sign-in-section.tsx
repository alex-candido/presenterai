import { cn } from "@/lib/utils";
import { AuthCard } from "../root/auth-card";
import { SignInForm } from "./sign-in-form";

export function SignInSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("sign-in-section", className)} {...props}>
      <AuthCard
        title="Sign In"
        description="Enter your email below to login to your account"
        footerLabel="Don't have an account?"
        footerLinkHref="/auth/sign-up"
        footerLinkText="Sign Up"
      >
        <SignInForm />
      </AuthCard>
    </section>
  );
}