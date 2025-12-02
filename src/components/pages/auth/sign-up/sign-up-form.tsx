"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Control, FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

import { FormFieldCustom } from "@/components/custom";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  Input
} from "@/components/ui";

import { cn } from "@/lib/utils";
import { SignUpFormValues } from "@/schemas/auth-schema";
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
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <FormFieldCustom
                control={control}
                name="name"
                label="Name"
              >
                <Input type="text" placeholder="e.g., John Doe" />
              </FormFieldCustom>
              <FormFieldCustom
                control={control}
                name="email"
                label="Email"
              >
                <Input type="email" placeholder="e.g., john.doe@example.com" />
              </FormFieldCustom>
              <FormFieldCustom
                control={control}
                name="password"
                label="Password"
              >
                <Input type="password" placeholder="********" />
              </FormFieldCustom>
              <FormFieldCustom
                control={control}
                name="agreeTerms"
                label={<AgreeTermsLabel />}
                ui={{
                  formItem: "flex flex-row-reverse items-center",
                  formLabel: "ml-2 !mb-0",
                }}
              >
                <Checkbox />
              </FormFieldCustom>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
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
