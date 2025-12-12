"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthActions } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { CustomDropdownUserMenu } from "@/components/custom";
import { LandingCtaMenu } from "./landing-cta-menu";

export function LandingActionsMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { useSession } = useAuthActions();
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
            <Link href={isAdmin ? "/admin" : "/app"}>{isAdmin ? "Admin" : "App"}</Link>
          </Button>
          <CustomDropdownUserMenu />
        </>
      ) : (
        <LandingCtaMenu />
      )}
    </div>
  );
}
