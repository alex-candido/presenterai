"use client";

import { AlertCircle } from "lucide-react";
import * as React from "react";

import { AlertAdapter, ButtonAdapter, FormFieldAdapter } from "@/components/adapters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SignUpFormValues } from "@/schemas/auth-schema";
import Link from "next/link";
import { Control, FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";
import { AgreeTermsLabel } from "./agree-terms-label";

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<SignUpFormValues, any>;
  handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<SignUpFormValues>;
  isSubmitting: boolean;
  errors: FieldErrors<FieldValues>;
}

export function SignUpForm({
  form,
  handleSubmit,
  control,
  isSubmitting,
  errors,
  className,
  ...props
}: SignUpFormProps) {
  return (
    <div className={cn("sign-up-form", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {errors.root?.message && (
                <AlertAdapter
                  variant="destructive"
                  title="Registration Failed"
                  description={errors.root.message}
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
                  formItem: "flex flex-row-reverse items-center",
                  formLabel: "ml-2 !mb-0",
                }}
              />
              <ButtonAdapter type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </ButtonAdapter>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 justify-center">
          <label className="text-center text-sm">Already have an account?</label>
          <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
