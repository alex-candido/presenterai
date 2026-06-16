"use client";

import {
    DocumentsDetails,
    DocumentsHeader,
} from "@/components/app/admin/documents";

export default function AdminDocumentDetailsPage() {
  return (
    <div className="admin-document-details-page">
      <DocumentsHeader />
      <DocumentsDetails />
    </div>
  );
}
