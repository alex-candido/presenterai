import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

export interface ButtonCustomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  to?: string;
}

const ButtonCustom = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonCustomProps
>(
  (
    {
      className,
      variant,
      size,
      children,
      to,
      ...props
    },
    ref,
  ) => {
    if (to) {
      return (
        <Button
          asChild
          variant={variant}
          size={size}
          className={cn("button-adapter", className)}
           {...props}
        >
          <Link href={to} ref={ref as React.Ref<HTMLAnchorElement>}>
            {children}
          </Link>
        </Button>
      );
    }

    return (
      <Button
        variant={variant}
        size={size}
        className={cn("button-adapter", className)}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };
