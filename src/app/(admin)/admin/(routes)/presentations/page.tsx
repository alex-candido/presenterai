"use client";

import {
    PresentationsHeader,
    PresentationsListSection,
    PresentationsStatsSection,
} from "@/components/app/admin/presentations";

export default function AdminPresentationsPage() {
  return (
    <div className="admin-presentations-page">
      <PresentationsHeader />
      <PresentationsStatsSection />
      <PresentationsListSection />
    </div>
  );
}
