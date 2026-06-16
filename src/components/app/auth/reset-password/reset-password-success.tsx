import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ResetPasswordSuccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Password Reset Successful</CardTitle>
        <CardDescription className="text-center">
          Your password has been changed successfully.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm">
        <p>You can now sign in with your new password.</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/auth/sign-in">Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
