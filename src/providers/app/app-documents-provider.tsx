"use client";
import { createContext, ReactNode, useContext } from "react";

type AppDocumentsContextProps = object;

const AppDocumentsContext = createContext<
  AppDocumentsContextProps | undefined
>(undefined);

export const AppDocumentsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = {
    // TODO: Add state and functions
  };

  return (
    <AppDocumentsContext.Provider value={value}>
      {children}
    </AppDocumentsContext.Provider>
  );
};

export const useAppDocuments = () => {
  const context = useContext(AppDocumentsContext);
  if (context === undefined) {
    throw new Error(
      "useAppDocuments must be used within an AppDocumentsProvider",
    );
  }
  return context;
};
