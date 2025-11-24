"use client";
import { createContext, ReactNode, useContext } from "react";

type AppPresentationsContextProps = object;

const AppPresentationsContext = createContext<
  AppPresentationsContextProps | undefined
>(undefined);

export const AppPresentationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = {
    // TODO: Add state and functions
  };

  return (
    <AppPresentationsContext.Provider value={value}>
      {children}
    </AppPresentationsContext.Provider>
  );
};

export const useAppPresentations = () => {
  const context = useContext(AppPresentationsContext);
  if (context === undefined) {
    throw new Error(
      "useAppPresentations must be used within an AppPresentationsProvider",
    );
  }
  return context;
};
