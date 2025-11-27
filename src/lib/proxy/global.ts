import { APP_ROUTES } from "@/config/routes";
import { handleRouteAuthorization, RouteProtectionRule } from "@/lib/proxy";
import { auth } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { Session, User } from "better-auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

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

export async function globalRouteProxy(request: NextRequest) {
  const session: {
    user: User | (User & { role: UserRole });
    session: Session;
  } | null = await auth.api.getSession({ headers: await headers() });
  console.log(session)
  for (const rule of protectedRoutesConfig) {
    const response = handleRouteAuthorization(request, session, rule);
    if (response) {
      return response;
    }
  }
}
