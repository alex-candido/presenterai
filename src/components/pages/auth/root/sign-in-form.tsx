import { cn } from "@/lib/utils";

export function SignInForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn("sign-in-form", className)}
      {...props}
    >
      <h2>Sign In</h2>
      {/* Form fields for sign-in */}
    </form>
  );
}
