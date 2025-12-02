import { authActions } from "@/actions/auth-actions";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/schemas/auth-schema";
import { ForgotPasswordForm } from "./forgot-password-form";
import { ForgotPasswordSuccess } from "./forgot-password-success";

export function ForgotPasswordSection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { requestPasswordReset } = authActions();

  const action = async (data: ForgotPasswordFormValues) => {
    const redirectTo = `${window.location.origin}/auth/reset-password`;
    const { error, data: resultData } = await requestPasswordReset({ ...data, redirectTo });
    if (error) throw new Error(error.message);
    return resultData;
  };

  const {
    form,
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ForgotPasswordFormValues, any>({
    schema: forgotPasswordSchema,
    defaultValues: {
      email: "",
      redirectTo: "",
    },
    mutationFn: action,
    onSuccess: (data) => {
      form.reset();
    },
  });

  return (
    <section className={cn("forgot-password-section", className)} {...props}>
      {isSubmitSuccessful ? (
        <ForgotPasswordSuccess />
      ) : (
        <ForgotPasswordForm
          form={form}
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      )}
    </section>
  );
}
