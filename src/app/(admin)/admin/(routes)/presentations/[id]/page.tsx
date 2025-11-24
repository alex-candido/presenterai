"use client";

import {
  PresentationsDetails,
  PresentationsHeader,
} from "@/components/pages/admin/presentations";

export default function AdminPresentationDetailsPage() {
  return (
    <div className="admin-presentation-details-page">
      <PresentationsHeader /> {/* Dynamic title like "Presentation Details #[id]" */}
      <PresentationsDetails />
    </div>
  );
}
