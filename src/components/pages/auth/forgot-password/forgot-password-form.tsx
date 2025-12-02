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
  Form,
  Input
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { ForgotPasswordFormValues } from "@/schemas/auth-schema";

interface ForgotPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<ForgotPasswordFormValues, any>;
  handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<ForgotPasswordFormValues>;
  isSubmitting: boolean;
  errors: FieldErrors<FieldValues>;
}

export function ForgotPasswordForm({
  form,
  handleSubmit,
  control,
  isSubmitting,
  errors,
  className,
  ...props
}: ForgotPasswordFormProps) {
  return (
    <div className={cn("forgot-password-form", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">Enter your email to receive a password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {errors.root?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <FormFieldCustom
                control={control}
                name="email"
                label="Email"
              >
                <Input type="email" placeholder="e.g., john.doe@example.com" />
              </FormFieldCustom>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 justify-center">
          <label className="text-center text-sm">Remembered your password?</label>
          <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}