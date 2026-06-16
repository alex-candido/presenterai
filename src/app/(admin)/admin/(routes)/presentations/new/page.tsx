"use client";

import {
    PresentationsForm,
    PresentationsHeader,
} from "@/components/app/admin/presentations";

export default function AdminPresentationNewPage() {
  return (
    <div className="admin-presentation-new-page">
      <PresentationsHeader /> {/* Dynamic title like "New Presentation" */}
      <PresentationsForm />
    </div>
  );
}
