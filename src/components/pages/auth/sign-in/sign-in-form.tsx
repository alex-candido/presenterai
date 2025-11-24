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
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { SignInFormValues } from "@/schemas/auth-schema";
import { AuthSocialButtons } from "../root/auth-social-buttons";

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
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {errors.root?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., john.doe@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>
                <Link href="/auth/forgot-password" className="underline underline-offset-4">
                  Forgot password?
                </Link>
              </FormLabel>
              <Button type="submit" className="w-full" disabled={isSubmitting || !form.formState.isDirty || !form.formState.isValid}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <AuthSocialButtons />
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
