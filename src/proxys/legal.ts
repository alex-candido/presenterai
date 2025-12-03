import { APP_ROUTES } from "@/config/routes";
import { NextRequest } from "next/server";
import { redirect } from "../lib/utils";

export async function termsRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === APP_ROUTES.TERMS.path) {
    return redirect(request, APP_ROUTES.TERMS.DETAIL("terms-of-service"))
  }
}