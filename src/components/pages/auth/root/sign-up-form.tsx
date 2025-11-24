import { cn } from "@/lib/utils";

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={cn("sign-up-form", className)}
      {...props}
    >
      <h2>Sign Up</h2>
      {/* Form fields for sign-up */}
    </form>
  );
}
