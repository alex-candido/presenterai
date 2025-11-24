"use client";

import { authActions } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { LandingCtaMenu } from "./landing-cta-menu";
import { LandingUserMenu } from "./landing-user-menu";

export function LandingActionsMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { useSession } = authActions()
  const { data, isPending } = useSession();

  if (isPending) {
    return (
      <div className={cn("flex items-center gap-2", className)} {...props}>
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  const user: any = data?.user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className={cn("landing-actions-menu flex items-center gap-2", className)} {...props}>
      {user ? (
        <>
          <Button variant="outline" asChild>
            <Link href={isAdmin ? "/admin" : "/app"}>
              {isAdmin ? "Admin" : "Dashboard"}
            </Link>
          </Button>
          <LandingUserMenu user={user} />
        </>
      ) : (
        <LandingCtaMenu />
      )}
    </div>
  );
}