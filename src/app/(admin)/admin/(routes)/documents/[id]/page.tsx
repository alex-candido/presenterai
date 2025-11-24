"use client";

import {
  DocumentsDetails,
  DocumentsHeader,
} from "@/components/pages/admin/documents";

export default function AdminDocumentDetailsPage() {
  return (
    <div className="admin-document-details-page">
      <DocumentsHeader />
      <DocumentsDetails />
    </div>
  );
}
