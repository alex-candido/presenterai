import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import {
  AdminDashboardProvider,
  AdminDocumentsProvider,
  AdminGenerationsProvider,
  AdminPresentationsProvider,
  AdminUsersProvider,
} from "@/providers/admin";
import {
  AppDocumentsProvider,
  AppGenerateProvider,
  AppPresentationsProvider,
  AppProvider,
} from "@/providers/app";

import { ReactQueryProvider, ThemeProvider } from "@/providers/next";

const AdminProviders = ({ children }: { children: ReactNode }) => (
  <AdminDashboardProvider>
    <AdminDocumentsProvider>
      <AdminGenerationsProvider>
        <AdminPresentationsProvider>
          <AdminUsersProvider>{children}</AdminUsersProvider>
        </AdminPresentationsProvider>
      </AdminGenerationsProvider>
    </AdminDocumentsProvider>
  </AdminDashboardProvider>
);

const AppProviders = ({ children }: { children: ReactNode }) => (
  <AppProvider>
    <AppDocumentsProvider>
      <AppGenerateProvider>
        <AppPresentationsProvider>{children}</AppPresentationsProvider>
      </AppGenerateProvider>
    </AppDocumentsProvider>
  </AppProvider>
);

// const AuthProviders = ({ children }: { children: ReactNode }) => (
//   <AuthSignUpProvider>
//     {children}
//   </AuthSignUpProvider>
// )

const NextProviders = ({ children }: { children: ReactNode }) => (
  <ReactQueryProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </ReactQueryProvider>
);

export function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <NextProviders>
        <AppProviders>
          <AdminProviders>
            {children}
            <Toaster />
          </AdminProviders>
        </AppProviders>
      </NextProviders>
    </>
  );
}
