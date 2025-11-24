"use client";

import { FormFieldAdapter } from "@/components/adapters/form-field-adapter";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { SignUpFormValues, signUpSchema } from "@/schemas/auth-schema";
import { authClient } from "@/server/auth/client";
import * as React from "react";

const mutationFn = async (data: SignUpFormValues) => {
  // Map form `username` to `name` for the API
  const { username, ...rest } = data;
  const { data: resultData, error } = await authClient.signUp.email({
    name: username,
    ...rest,
  });

  if (error) {
    // Throw an error to be caught by the useForm hook's onError handler
    throw new Error(error.message);
  }

  return resultData;
};

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { form, handleSubmit, isSubmitting, apiError } = useForm<
    SignUpFormValues,
    any // The success data type from better-auth is unknown, so using 'any'
  >({
    schema: signUpSchema,
    mutationFn,
    onSuccess: (data) => {
      console.log("Success:", data);
      // Here you would typically redirect the user
    },
  });

  return (
    <div className={cn("sign-up-form", className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {apiError && (
            <p className="text-center text-sm font-medium text-destructive">
              {apiError}
            </p>
          )}
          <FormFieldAdapter
            renderAs="input"
            type="text"
            control={form.control}
            name="username"
            label="Username"
            placeholder="e.g., john_doe"
          />
          <FormFieldAdapter
            renderAs="input"
            type="email"
            control={form.control}
            name="email"
            label="Email"
            placeholder="e.g., john.doe@example.com"
          />
          <FormFieldAdapter
            renderAs="input"
            type="password"
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
