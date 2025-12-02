"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  statusCode: number;
  title: string;
  description: string;
  showGoHomeButton?: boolean;
}

export function ErrorPage({
  statusCode,
  title,
  description,
  showGoHomeButton = true,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight text-destructive">
            {statusCode}
          </CardTitle>
          <CardDescription className="text-xl font-medium text-foreground">
            {title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        {showGoHomeButton && (
          <div className="p-6 pt-0">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Go back to Home
              </Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
