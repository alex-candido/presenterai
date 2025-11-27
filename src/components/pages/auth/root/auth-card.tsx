import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as React from "react";

interface AuthCardProps extends React.HTMLAttributes<HTMLElement> {
  cardHeader?: React.ReactNode;
  cardFooter?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthCard({
  cardTitle,
  cardFooter,
  children,
  className,
  ...props
}: AuthCardProps) {
  return (
    <div className={cn("auth-card", className)} {...props}>
      <Card {...props}>
        <CardHeader className="space-y-1">
          {cardFooter}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
      </Card>
    </div>
  );
}
