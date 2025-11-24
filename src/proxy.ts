import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { authRouteProxy, globalRouteProxy } from "@/proxys";
import { APP_ROUTES } from './config/routes';
 
export async function proxy(request: NextRequest) {
try {
    let response: NextResponse | undefined;

    response = await globalRouteProxy(request);
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