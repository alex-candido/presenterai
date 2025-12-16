"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useAuthActions } from "@/hooks/use-auth";

export function LandingLayoutAppEntryBanner({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { useSession } = useAuthActions();
  const { data, isPending } = useSession();

  const user: any = data?.user;
  const isAdmin = user?.role === "ADMIN";
  const href = isAdmin ? "/admin" : "/app";

  if (isPending || !user) {
    return null;
  }

  return (
    <div className={cn("landing-layout-app-entry-banner border-b border-border ", className)} {...props}>
      <div className="mx-auto px-4 flex items-center justify-center p-3">
        <p className="text-sm font-medium">
          You are logged in.{" "}
          <Link href={href} className="underline hover:no-underline cursor-pointer">
            Go to your {isAdmin ? "admin" : "app"}
            <ArrowRight className="inline h-4 w-4" />
          </Link>
        </p>
      </div>
    </div>
  );
}
