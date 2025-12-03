import { APP_ROUTES } from "@/config/routes";
import { redirect } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function adminRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === APP_ROUTES.ADMIN.path) {
    return redirect(request, APP_ROUTES.ADMIN.DASHBOARD.path)
  }
}