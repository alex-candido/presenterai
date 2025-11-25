"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import {
  AlertAdapter,
  ButtonAdapter,
  FormFieldAdapter,
} from "@/components/adapters";
import { Form } from "@/components/ui/form";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { API_MESSAGES } from "@/lib/utils/messages";
import { SignUpFormValues, signUpSchema } from "@/schemas/auth-schema";
import { authClient } from "@/server/auth/client";
import { AgreeTermsLabel } from "./agree-terms-label";

const mutationFn = async (data: SignUpFormValues) => {
  const { agreeTerms, ...rest } = data;
  const { data: resultData, error } = await authClient.signUp.email({
    ...rest,
    callbackURL: "/",
  });

  if (error) {
    throw new Error(error.message);
  }

  return resultData;
};

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isSuccess, setIsSuccess] = useState(false);

  const { form, handleSubmit, control, isSubmitting, apiError } = useForm<
    SignUpFormValues,
    any
  >({
    schema: signUpSchema,
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
    mutationFn,
    onSuccess: (_data) => {
      setIsSuccess(true);
      form.reset();
    },
    onError: (_error) => {
      setIsSuccess(false);
    },
  });

  return (
    <div className={cn("sign-up-form", className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {isSuccess && (
            <AlertAdapter
              variant="default"
              title="Success!"
              description={API_MESSAGES.AUTH.SIGN_UP_SUCCESS}
              icon={<CheckCircle className="h-4 w-4" />}
            />
          )}
          {apiError && !isSuccess && (
            <AlertAdapter
              variant="destructive"
              title="Registration Failed"
              description={apiError}
              icon={<AlertCircle className="h-4 w-4" />}
            />
          )}
          <FormFieldAdapter
            renderAs="input"
            type="text"
            control={control}
            name="name"
            label="Name"
            placeholder="e.g., John Doe"
          />
          <FormFieldAdapter
            renderAs="input"
            type="text"
            control={control}
            name="username"
            label="Username"
            placeholder="e.g., john_doe"
          />
          <FormFieldAdapter
            renderAs="input"
            type="email"
            control={control}
            name="email"
            label="Email"
            placeholder="e.g., john.doe@example.com"
          />
          <FormFieldAdapter
            renderAs="input"
            type="password"
            control={control}
            name="password"
            label="Password"
            placeholder="********"
          />
          <FormFieldAdapter
            renderAs="checkbox"
            control={control}
            name="agreeTerms"
            label={
              <>
                <AgreeTermsLabel />
              </>
            }
            ui={{
              formItem: "flex flex-row-reverse justify-end",
            }}
          />
          <ButtonAdapter
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </ButtonAdapter>
        </form>
      </Form>
    </div>
  );
}
