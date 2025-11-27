import { cn } from "@/lib/utils";
import { AuthCard } from "../root/auth-card";
import { ResetPasswordForm } from "./reset-password-form";

export function ResetPasswordSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const uiContent = {
    title: "Reset Password",
    description: "Enter your new password",
    footerLabel: "Remembered your password?",
    footerLinkHref: "/auth/sign-in",
    footerLinkText: "Sign In",
  };
  return (
    <section className={cn("reset-password-section", className)} {...props}>
      <AuthCard uiContent={uiContent}>
        <ResetPasswordForm />
      </AuthCard>
    </section>
  );
}
