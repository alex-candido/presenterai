"use client";

import {
  GenerateDetails,
  GenerateHeader,
} from "@/components/pages/admin/generate";

export default function AdminGenerationDetailsPage() {
  return (
    <div className="admin-generation-details-page">
      <GenerateHeader /> {/* Dynamic title like "Generation Details #[id]" */}
      <GenerateDetails />
    </div>
  );
}
