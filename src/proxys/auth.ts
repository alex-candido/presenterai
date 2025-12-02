import { APP_ROUTES } from "@/config/routes";
import { auth } from "@/lib/auth/index";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function authRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    const isGuestPath = Object.values(APP_ROUTES.AUTH).some(
      (route) => route.path === pathname,
    );
    if (isGuestPath) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.APP.APP.path, request.url),
      );
    }
  }
}
