import { APP_ROUTES } from "@/config/routes";
import { NextRequest } from "next/server";
import { redirect } from "../lib/utils";

export async function docsRouteProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === APP_ROUTES.DOCS.path) {
    return redirect(request, APP_ROUTES.DOCS.DETAIL("getting-started"))
  }
}