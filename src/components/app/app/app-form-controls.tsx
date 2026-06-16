"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

interface AppFormControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  isSubmitting: boolean;
  isValid: boolean;
}

export function AppFormControls({
  isSubmitting,
  isValid,
  className,
  ...props
}: AppFormControlsProps) {
  return (
    <div
      className={cn("app-form-controls flex justify-end", className)}
      {...props}
    >
      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Start Generating
          </>
        )}
      </Button>
    </div>
  );
}