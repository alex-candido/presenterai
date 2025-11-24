"use client";

import {
  AppDocumentsHeader,
  AppDocumentsList,
  AppDocumentsToolbar
} from "@/components/pages/app/documents";

export default function DocumentsPage() {
  return (
    <div className="app-documents-page">
      <AppDocumentsHeader />
      <AppDocumentsToolbar />
      <AppDocumentsList />
    </div>
  );
}
