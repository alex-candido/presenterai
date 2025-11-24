"use client";
import { createContext, ReactNode, useContext } from "react";

type AdminDocumentsContextProps = object;

const AdminDocumentsContext = createContext<AdminDocumentsContextProps | undefined>(undefined);

export const AdminDocumentsProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    // TODO: Add state and functions for admin documents
  };

  return (
    <AdminDocumentsContext.Provider value={value}>
      {children}
    </AdminDocumentsContext.Provider>
  );
};

export const useAdminDocuments = () => {
  const context = useContext(AdminDocumentsContext);
  if (context === undefined) {
    throw new Error("useAdminDocuments must be used within an AdminDocumentsProvider");
  }
  return context;
};
