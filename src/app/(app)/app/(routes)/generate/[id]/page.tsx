"use client";

import {
  GenerateHeader,
  GenerateOutlinePanel,
  GenerateSettingsPanel,
} from "@/components/pages/app/generate";

export default function GeneratePage() {
  return (
    <div className="generate-page">
      <GenerateHeader />
      <GenerateOutlinePanel />
      <GenerateSettingsPanel />
    </div>
  );
}
