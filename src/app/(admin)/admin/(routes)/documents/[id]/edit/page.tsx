"use client";

import {
    DocumentsForm,
    DocumentsHeader,
} from "@/components/app/admin/documents";

export default function AdminDocumentEditPage() {
  return (
    <div className="admin-document-edit-page">
      <DocumentsHeader /> 
      <DocumentsForm />
    </div>
  );
}
