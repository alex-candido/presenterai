import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ForgotPasswordSuccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
        <CardDescription className="text-center">
          We&apos;ve sent a password reset link to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm">
        <p>Please check your inbox and follow the instructions to reset your password.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/auth/sign-in">Back to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
