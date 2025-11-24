import { APP_ROUTES } from "@/lib/utils/routes";
import { auth } from "@/server/auth";
import {
  handleRouteAuthorization,
  RouteProtectionRule,
} from "@/server/auth/utils";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function globalRouteProxy(request: NextRequest) {
  const protectedRoutesConfig: RouteProtectionRule[] = [
    {
      path: "/admin",
      roles: ["ADMIN"],
      redirects: {
        unauthenticated: APP_ROUTES.AUTH.SIGN_IN.path,
        unauthorized: APP_ROUTES.APP.APP.path,
      },
    },
    {
      path: "/app",
      roles: ["ADMIN", "MEMBER"],
      redirects: {
        unauthenticated: APP_ROUTES.AUTH.SIGN_IN.path,
        unauthorized: APP_ROUTES.HOME.path,
      },
    },
  ];

  const session = await auth.api.getSession({ headers: await headers() });

  for (const rule of protectedRoutesConfig) {
    const response = handleRouteAuthorization(request, session, rule);
    if (response) {
      return response;
    }
  }
}
