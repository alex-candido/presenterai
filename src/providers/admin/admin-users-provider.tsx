"use client";
import { createContext, ReactNode, useContext } from "react";

type AdminUsersContextProps = object;

const AdminUsersContext = createContext<AdminUsersContextProps | undefined>(undefined);

export const AdminUsersProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    // TODO: Add state and functions for admin users
  };

  return (
    <AdminUsersContext.Provider value={value}>
      {children}
    </AdminUsersContext.Provider>
  );
};

export const useAdminUsers = () => {
  const context = useContext(AdminUsersContext);
  if (context === undefined) {
    throw new Error("useAdminUsers must be used within an AdminUsersProvider");
  }
  return context;
};
