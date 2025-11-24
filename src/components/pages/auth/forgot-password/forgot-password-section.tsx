import { cn } from "@/lib/utils";
import { AuthCard } from "../root/auth-card";
import { ForgotPasswordForm } from "./forgot-password-form";

export function ForgotPasswordSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("forgot-password-section", className)} {...props}>
      <AuthCard
        title="Forgot Password"
        description="Enter your email to receive a password reset link"
        footerLabel="Remembered your password?"
        footerLinkHref="/auth/sign-in"
        footerLinkText="Sign In"
      >
        <ForgotPasswordForm />
      </AuthCard>
    </section>
  );
}
