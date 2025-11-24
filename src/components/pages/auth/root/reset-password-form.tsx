import { cn } from "@/lib/utils";

export function ResetPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn("reset-password-form", className)}
      {...props}
    >
      <h2>Reset Password</h2>
      {/* Form fields for reset password */}
    </form>
  );
}
