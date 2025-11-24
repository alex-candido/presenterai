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
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "@/components/ui";

import { cn } from "@/lib/utils";
import { SignUpFormValues } from "@/schemas/auth-schema";
import { AuthSocialButtons } from "../root/auth-social-buttons";
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
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {errors.root?.message && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Registration Failed</AlertTitle>
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g., John Doe" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row-reverse items-center">
                      <FormLabel className="ml-2 !mt-0">
                        <AgreeTermsLabel />
                      </FormLabel>
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isSubmitting} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting || !form.formState.isDirty || !form.formState.isValid}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    "Signing Up..."
                  </>
                ) : (
                  "Sign Up"
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
          <label className="text-center text-sm">Already have an account?</label>
          <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
