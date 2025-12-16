"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Badge } from "../ui";

export function BaseDropdownUserMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { signOut, useSession } = useAuthActions();
  const { data } = useSession();

  const user: any = data?.user
  const basePath = user?.role === "ADMIN" ? "admin" : "app";

  const initials = user?.name
    ?.split(" ")
    .map((n: any) => n[0])
    .join("");

  return (
    <div className={cn("base-dropdown-user-menu", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative h-10 w-10 rounded-full" variant="ghost">
            <Avatar>
              {user && <AvatarImage src={user.image} alt={user.name ?? ""} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback>HB</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm leading-none">{user?.name}</p>
                <p className="text-muted-foreground text-xs leading-none">{user?.email}</p>
                <Badge className="w-fit text-xs" variant="secondary">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/${basePath}/settings/profile`} className="cursor-pointer">
              <User className="mr-1 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${basePath}/settings/account`} className="cursor-pointer">
              <Settings className="mr-1 h-4 w-4" />
              <span>Account Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => signOut()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
