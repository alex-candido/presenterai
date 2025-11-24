"use client";
import { createContext, ReactNode, useContext } from "react";

type AdminPresentationsContextProps = object;

const AdminPresentationsContext = createContext<AdminPresentationsContextProps | undefined>(undefined);

export const AdminPresentationsProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    // TODO: Add state and functions for admin presentations
  };

  return (
    <AdminPresentationsContext.Provider value={value}>
      {children}
    </AdminPresentationsContext.Provider>
  );
};

export const useAdminPresentations = () => {
  const context = useContext(AdminPresentationsContext);
  if (context === undefined) {
    throw new Error("useAdminPresentations must be used within an AdminPresentationsProvider");
  }
  return context;
};
