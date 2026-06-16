"use client";

import {
    DocumentsHeader,
    DocumentsListSection,
    DocumentsStatsSection,
} from "@/components/app/admin/documents";
export default function AdminDocumentsPage() {
  return (
    <div className="admin-documents-page">
      <DocumentsHeader />
      <DocumentsStatsSection />
      <DocumentsListSection />
    </div>
  );
}
