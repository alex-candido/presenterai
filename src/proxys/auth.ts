import { headers } from "next/headers";
import { NextRequest } from "next/server";

import { APP_ROUTES } from "@/config/routes";
import { redirect } from "@/lib/utils";
import { auth } from "@/server/auth/index";


export async function authRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    const isGuestPath = Object.values(APP_ROUTES.AUTH).some(
      (route) => route.path === pathname,
    );
    if (isGuestPath && session.user?.role == "MEMBER") {
      return redirect(request, APP_ROUTES.APP.APP.path)
    }
    if (isGuestPath && session.user?.role == "ADMIN") {
      return redirect(request, APP_ROUTES.ADMIN.path)
    }
  }
}
