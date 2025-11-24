import { cn } from "@/lib/utils";
import { AuthCard } from "../root/auth-card";
import { SignUpForm } from "./sign-up-form";

export function SignUpSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("sign-up-section", className)} {...props}>
      <AuthCard
        title="Sign Up"
        description="Enter your details to create an account"
        footerLabel="Already have an account?"
        footerLinkHref="/auth/sign-in"
        footerLinkText="Sign In"
      >
        <SignUpForm />
      </AuthCard>
    </section>
  );
}