import { APP_ROUTES } from "@/config/routes";
import { auth } from "@/lib/auth/index";
import { handleRouteAuthorization, RouteProtectionRule } from "@/proxys/";
import { UserRole } from "@prisma/client";
import { Session, User } from "better-auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

  if (session && !session.user.emailVerified && request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL(APP_ROUTES.HOME.path, request.url));
  }

  for (const rule of protectedRoutesConfig) {
    const response = handleRouteAuthorization(request, session, rule);
    if (response) {
      return response;
    }
  }
}
