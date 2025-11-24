import { cn } from "@/lib/utils";
import { AuthCard } from "../root/auth-card";
import { ResetPasswordForm } from "./reset-password-form";

export function ResetPasswordSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("reset-password-section", className)} {...props}>
      <AuthCard
        title="Reset Password"
        description="Enter your new password"
        footerLabel="Remembered your password?"
        footerLinkHref="/auth/sign-in"
        footerLinkText="Sign In"
      >
        <ResetPasswordForm />
      </AuthCard>
    </section>
  );
}
