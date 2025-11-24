"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { RiNextjsLine } from "react-icons/ri";

type BaseLogoProps = React.HTMLAttributes<HTMLElement> & {
  isExpanded?: boolean;
  href?: string;
}

export function BaseLogo({
  isExpanded = true,
  href,
  className,
  ...props
}: BaseLogoProps) {
  const LogoContent = (
    <div
      className={cn("base-logo flex items-center gap-2", className)}
      {...props}
    >
      <RiNextjsLine className="h-8 w-8" />
      {isExpanded && <span className="text-xl font-bold">PresenterAI</span>}
    </div>
  );

  if (href) {
    return <Link href={href}>{LogoContent}</Link>;
  }

  return LogoContent;
}
