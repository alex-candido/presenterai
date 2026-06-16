"use client";

import { BaseDropdownUserMenu } from "@/components/base";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthActions } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function AdminActionsMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { useSession } = useAuthActions();
  const { data, isPending } = useSession();
  const user: any = data?.user;

  if (isPending) {
    return (
      <div className={cn("flex items-center gap-2", className)} {...props}>
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn("admin-actions-menu flex items-center gap-2", className)} {...props}>
      <>
        <BaseDropdownUserMenu  />
      </>
    </div>
  );
}
