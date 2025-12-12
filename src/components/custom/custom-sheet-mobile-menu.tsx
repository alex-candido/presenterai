"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { cn } from "@/lib/utils";
import { LayoutDashboard, Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { BaseLogo } from '../base';
import { Button } from '../ui';

export function CustomSheetMobileMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  return (
    <div className={cn("custom-sheet-mobile-menu", className)} {...props}>
       <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0 gap-0 [&>button]:hidden overflow-hidden flex flex-col">
            <div className="flex flex-col h-full">
              <SheetHeader className="h-16 space-y-0 p-4 pb-2 border-b">
                <div className="flex items-center gap-2">
                  <BaseLogo isExpanded={false} />
                  <SheetTitle className="text-lg font-semibold">PresenterAI</SheetTitle>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer h-8 w-8"
                    >
                      <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="cursor-pointer h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-6 space-y-1">
                
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="border-t p-6 space-y-4">

                {/* Primary Actions */}
                <div className="space-y-3">
                  <Button variant="outline" size="lg" asChild className="w-full cursor-pointer">
                    <a href={"/dashboard"}>
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </a>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" asChild className="cursor-pointer">
                      <a href={"/auth/sign-in"}>Sign In</a>
                    </Button>
                    <Button asChild size="lg" className="cursor-pointer" >
                      <a href={"/auth/sign-up"}>Get Started</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}