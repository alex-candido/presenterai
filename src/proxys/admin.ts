import { APP_ROUTES } from "@/config/routes";
import { NextRequest, NextResponse } from "next/server";

export async function adminRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL(APP_ROUTES.ADMIN.DASHBOARD.path, request.url));
  }
}