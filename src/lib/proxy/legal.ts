import { APP_ROUTES } from "@/config/routes";
import { NextRequest, NextResponse } from "next/server";

export async function termsRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/legal') {
    return NextResponse.redirect(new URL(APP_ROUTES.TERMS.DETAIL("terms-of-service"), request.url));
  }
}