import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { adminRouteProxy } from "@/lib/proxy/admin";
import { authRouteProxy } from "@/lib/proxy/auth";
import { globalRouteProxy } from "@/lib/proxy/global";
import { APP_ROUTES } from '@/lib/utils/routes';
 
export async function proxy(request: NextRequest) {
try {
    let response: NextResponse | undefined;

    response = await globalRouteProxy(request);
    if (response) {
      return response;
    }

    response = await adminRouteProxy(request);
    if (response) {
      return response; 
    }

    response = await authRouteProxy(request);
    if (response) {
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(
      new URL(APP_ROUTES.AUTH.SIGN_IN.path, request.url),
    );
  }
}
 
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\.ico|sitemap\.xml|robots\.txt|images|.*\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)",
  ],
}