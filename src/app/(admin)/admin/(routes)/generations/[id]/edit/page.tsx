"use client";

import {
  GenerateForm,
  GenerateHeader,
} from "@/components/pages/admin/generate";

export default function AdminGenerationEditPage() {
  return (
    <div className="admin-generation-edit-page">
      <GenerateHeader /> {/* Dynamic title like "Edit Generation #[id]" */}
      <GenerateForm />
    </div>
  );
}
