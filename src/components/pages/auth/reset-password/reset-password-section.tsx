"use client";

import { useSearchParams } from "next/navigation";

import { authActions } from "@/actions/auth-actions";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { ResetPasswordFormValues, resetPasswordSchema } from "@/schemas/auth-schema";
import { ResetPasswordForm } from "./reset-password-form";
import { ResetPasswordSuccess } from "./reset-password-success";

export function ResetPasswordSection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { resetPassword } = authActions();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const action = async (data: ResetPasswordFormValues) => {
    if (!token) throw new Error("Password reset token is missing.");
    const { confirmPassword, ...rest } = data;
    const { error, data: resultData } = await resetPassword({ ...rest, token });
    if (error) throw new Error(error.message);
    return resultData;
  };

  const {
    form,
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ResetPasswordFormValues, any>({
    schema: resetPasswordSchema,
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mutationFn: action,
    onSuccess: (_data) => {
      form.reset();
    },
  });

  return (
    <section className={cn("reset-password-section", className)} {...props}>
      {isSubmitSuccessful ? (
        <ResetPasswordSuccess />
      ) : (
        <ResetPasswordForm
          form={form}
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          token={token}
        />
      )}
    </section>
  );
}
