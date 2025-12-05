"use client";

import { authActions } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { HomeCtaMenu } from "./home-cta-menu";
import { HomeUserMenu } from "./home-user-menu";

export function HomeActionsMenu({
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
    <div className={cn("home-actions-menu flex items-center gap-2", className)} {...props}>
      {user ? (
        <>
          <Button variant="outline" asChild>
            <Link href={isAdmin ? "/admin" : "/app"}>
              {isAdmin ? "Admin" : "Dashboard"}
            </Link>
          </Button>
          <HomeUserMenu user={user} />
        </>
      ) : (
        <HomeCtaMenu />
      )}
    </div>
  );
}