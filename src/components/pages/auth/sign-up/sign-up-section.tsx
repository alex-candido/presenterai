import { authActions } from "@/actions/auth-actions";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { SignUpFormValues, signUpSchema } from "@/schemas/auth-schema";
import React from "react";
import { SignUpForm } from "./sign-up-form";
import { SignUpSuccess } from "./sign-up-success";

export function SignUpSection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { signUp } = authActions();

  const action = async (data: SignUpFormValues) => {
    const { agreeTerms, ...rest } = data;
    const { data: resultData, error } = await signUp(rest);

    if (error) throw new Error(error.message);

    return resultData;
  };

  const {
    form,
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<SignUpFormValues, any>({
    schema: signUpSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
    mutationFn: action,
    onSuccess: (_data) => {
      form.reset();
    },
  });

  return (
    <section className={cn("sign-up-section", className)} {...props}>
      {isSubmitSuccessful ? (
        <SignUpSuccess />
      ) : (
        <SignUpForm
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
