import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { APP_ROUTES } from "@/config/routes";
import { AuthorizationStatus, globalAuthorization, redirect } from "@/lib/utils/proxy";
import { auth } from "@/server/auth/index";

export async function globalRouteProxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  const protectedRoutes = [APP_ROUTES.ADMIN, APP_ROUTES.APP].filter(
    (route) => route.authRequired && route.roles && route.redirects,
  );

  for (const rule of protectedRoutes) {
    const status = globalAuthorization(request.nextUrl.pathname, session, rule);

    if (status === AuthorizationStatus.UNAUTHENTICATED) {
      return redirect(request, rule.redirects.unauthenticated);
    }

    if (status === AuthorizationStatus.UNAUTHORIZED) {
      return redirect(request, rule.redirects.unauthorized);
    }

    if (status === AuthorizationStatus.EMAIL_NOT_VERIFIED) {
      return redirect(request, rule.redirects.emailNotVerified);
    }
  }
}
