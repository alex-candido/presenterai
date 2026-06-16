"use client";

import {
    AppGenerateHeader,
    AppGenerateOutlinePanel,
    AppGenerateSettingsPanel,
} from "@/components/app/app/generate";

export default function GeneratePage() {
  return (
    <div className="app-generate-page">
      <AppGenerateHeader />
      <AppGenerateOutlinePanel />
      <AppGenerateSettingsPanel />
    </div>
  );
}
