"use client";

import {
  PresentationsForm,
  PresentationsHeader,
} from "@/components/pages/admin/presentations";

export default function AdminPresentationEditPage() {
  return (
    <div className="admin-presentation-edit-page">
      <PresentationsHeader /> {/* Dynamic title like "Edit Presentation #[id]" */}
      <PresentationsForm />
    </div>
  );
}
