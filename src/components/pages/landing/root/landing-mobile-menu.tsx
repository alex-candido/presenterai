"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BaseLogo } from "@/components/base";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuthActions } from "@/hooks/use-auth";
import { LandingCtaMenu } from "./landing-cta-menu";


export function LandingMobileMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { useSession } = useAuthActions();
  const { data } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const user: any = data?.user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className={cn("landing-mobile-menu block xl:hidden", className)} {...props}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="xl:hidden">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] p-0 gap-0 [&>button]:hidden overflow-hidden flex flex-col"
        >
          <SheetHeader className="h-16 space-y-0 p-4 pb-2 border-b">
            <div className="flex items-center gap-2">
              <BaseLogo isExpanded={false} />
              <SheetTitle className="text-lg font-semibold">PresenterAI</SheetTitle>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="cursor-pointer h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-6 space-y-1"></nav>
            </div>
          </div>
          <SheetFooter className="border-t p-6 space-y-4">
            <div className="space-y-3">
              {user ? (
                <>
                  <Button variant="outline" asChild className="w-full cursor-pointer">
                    <Link href={isAdmin ? "/admin" : "/app"}>{isAdmin ? "Admin" : "App"}</Link>
                  </Button>
                </>
              ) : (
                <LandingCtaMenu className="grid grid-cols-2 gap-3" />
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
