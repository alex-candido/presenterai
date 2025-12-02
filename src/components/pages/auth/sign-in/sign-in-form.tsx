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
  FormLabel,
  Input,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { SignInFormValues } from "@/schemas/auth-schema";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<SignInFormValues, any>;
  handleSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  control: Control<SignInFormValues>;
  isSubmitting: boolean;
  errors: FieldErrors<FieldValues>;
}

export function SignInForm({
  form,
  handleSubmit,
  control,
  isSubmitting,
  errors,
  className,
  ...props
}: SignInFormProps) {
  return (
    <div className={cn("sign-in-form", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {errors.root?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <FormFieldCustom control={control} name="email" label="Email">
                <Input type="email" placeholder="e.g., john.doe@example.com" />
              </FormFieldCustom>
              <FormFieldCustom
                control={control}
                name="password"
                label="Password"
                ui={{
                  formItem: "",
                }}
              >
                <Input type="password" placeholder="********" />
              </FormFieldCustom>
              <FormLabel>
                <Link href="/auth/forgot-password" className="underline underline-offset-4">
                  Forgot password?
                </Link>
              </FormLabel>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 justify-center">
          <label className="text-center text-sm">Don&apos;t have an account?</label>
          <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
