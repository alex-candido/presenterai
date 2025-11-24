import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  footerLabel: string;
  footerLinkHref: string;
  footerLinkText: string;
  children: React.ReactNode;
}

export function AuthCard({
  children,
  title,
  description,
  footerLabel,
  footerLinkHref,
  footerLinkText,
  className,
  ...props
}: AuthCardProps) {
  return (
    <div className={cn("auth-card", className)} {...props}>
      <Card {...props}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col space-y-4 justify-center">
          <label className="text-center text-sm">{footerLabel}</label>
          <Link
            href={footerLinkHref}
            className="font-medium text-primary hover:underline"
          >
            {footerLinkText}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
