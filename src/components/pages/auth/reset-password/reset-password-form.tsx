"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Control, FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { ResetPasswordFormValues } from "@/schemas/auth-schema";

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<ResetPasswordFormValues, any>;
  handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<ResetPasswordFormValues>;
  isSubmitting: boolean;
  errors: FieldErrors<FieldValues>;
  token: string | null;
}

export function ResetPasswordForm({
  form,
  handleSubmit,
  control,
  isSubmitting,
  errors,
  token,
  className,
  ...props
}: ResetPasswordFormProps) {
  return (
    <div className={cn("reset-password-form", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          {!token ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Missing Token</AlertTitle>
              <AlertDescription>
                The password reset token is missing or invalid. Please request a new link.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {errors.root?.message && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errors.root.message}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!token || isSubmitting || !form.formState.isDirty || !form.formState.isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      "Resetting..."
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
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
