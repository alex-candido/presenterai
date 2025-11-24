"use client";
import { createContext, ReactNode, useContext } from "react";

type AdminDashboardContextProps = object;

const AdminDashboardContext = createContext<AdminDashboardContextProps | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    // TODO: Add state and functions for admin dashboard
  };

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (context === undefined) {
    throw new Error("useAdminDashboard must be used within an AdminDashboardProvider");
  }
  return context;
};
