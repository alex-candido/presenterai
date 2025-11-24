"use client";
import { createContext, ReactNode, useContext } from "react";

type AdminGenerationsContextProps = object;

const AdminGenerationsContext = createContext<AdminGenerationsContextProps | undefined>(undefined);

export const AdminGenerationsProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    // TODO: Add state and functions for admin generations
  };

  return (
    <AdminGenerationsContext.Provider value={value}>
      {children}
    </AdminGenerationsContext.Provider>
  );
};

export const useAdminGenerations = () => {
  const context = useContext(AdminGenerationsContext);
  if (context === undefined) {
    throw new Error("useAdminGenerations must be used within an AdminGenerationsProvider");
  }
  return context;
};
