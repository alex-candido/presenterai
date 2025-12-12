"use client";

import {
  DashboardDocumentsSummarySection,
  DashboardGenerationsSummarySection,
  DashboardHeaderSection,
  DashboardPresentationsSummarySection,
  DashboardRecentActivitySection,
  DashboardStatsSection,
  DashboardUserSummarySection
} from "@/components/pages/admin/dashboard";

export default function DashboardPage() {
  return (
    <div className="admin-dashboard-page">
      <DashboardHeaderSection />
      <DashboardStatsSection />
      <DashboardRecentActivitySection />
      <DashboardUserSummarySection />
      <DashboardGenerationsSummarySection />
      <DashboardDocumentsSummarySection />
      <DashboardPresentationsSummarySection />
    </div>
  );
}
