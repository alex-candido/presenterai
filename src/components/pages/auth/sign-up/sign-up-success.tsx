"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { API_MESSAGES } from "@/config/messages";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function SignUpSuccess() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="mt-4 text-xl font-bold">Registration Successful!</CardTitle>
        <CardDescription className="mt-2 text-base text-muted-foreground">
          {API_MESSAGES.AUTH.SIGN_UP_SUCCESS}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <Button asChild className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
