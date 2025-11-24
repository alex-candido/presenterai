import { BaseHero } from "@/components/base";
import { RiNextjsLine } from "react-icons/ri";

export function AuthHero() {
  return (
    <BaseHero>
      <RiNextjsLine className="h-8 w-8" />
      <h1 className="text-2xl font-bold">PresenterAI</h1>
    </BaseHero>
  );
}
