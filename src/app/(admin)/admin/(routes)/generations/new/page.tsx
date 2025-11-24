"use client";

import {
  GenerateForm,
  GenerateHeader,
} from "@/components/pages/admin/generate";

export default function AdminGenerationNewPage() {
  return (
    <div className="admin-generation-new-page">
      <GenerateHeader /> {/* Dynamic title like "New Generation" */}
      <GenerateForm />
    </div>
  );
}
