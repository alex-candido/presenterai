import { cn } from "@/lib/utils";

export function ForgotPasswordForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn("forgot-password-form", className)}
      {...props}
    >
      <h2>Forgot Password</h2>
      {/* Form fields for forgot password */}
    </form>
  );
}
