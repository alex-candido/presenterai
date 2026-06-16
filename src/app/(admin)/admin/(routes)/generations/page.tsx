"use client";

import {
    GenerateHeader,
    GenerateListSection,
    GenerateStatsSection,
} from "@/components/app/admin/generate";

export default function AdminGenerationsPage() {
  return (
    <div className="admin-generations-page">
      <GenerateHeader />
      <GenerateStatsSection />
      <GenerateListSection />
    </div>
  );
}
