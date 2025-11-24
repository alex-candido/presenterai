import { APP_ROUTES } from "@/lib/utils/routes";
import { NextRequest, NextResponse } from "next/server";

export async function docsRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/docs') {
    return NextResponse.redirect(new URL(APP_ROUTES.DOCS.DETAIL("getting-started"), request.url));
  }
}