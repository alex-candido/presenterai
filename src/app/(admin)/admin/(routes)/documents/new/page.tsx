"use client";

import {
  DocumentsForm,
  DocumentsHeader,
} from "@/components/pages/admin/documents";

export default function AdminDocumentNewPage() {
  return (
    <div className="admin-document-new-page">
      <DocumentsHeader /> {/* This header can be made dynamic to show "New Document" */}
      <DocumentsForm />
    </div>
  );
}
