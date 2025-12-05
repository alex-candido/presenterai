"use client";

import { BaseHero } from "@/components/base";
import Link from "next/link";
import { RiNextjsLine } from "react-icons/ri";

export function AuthHero() {
  return (
    <BaseHero>
      <Link href="/" className="flex">
        <RiNextjsLine className="h-8 w-8" />
        <h1 className="text-2xl font-bold">PresenterAI</h1>
      </Link>
    </BaseHero>
  );
}
