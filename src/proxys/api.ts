import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { APP_ROUTES } from '@/config/routes';
import {
  AuthorizationStatus,
  globalAuthorization,
} from '@/lib/utils/proxy';
import { auth } from '@/server/auth';

export async function apiRouteProxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  const protectedRoutes = [APP_ROUTES.API.ADMIN, APP_ROUTES.API.APP].filter(
    (route) => route.authRequired && route.roles && route.redirects,
  );

  for (const rule of protectedRoutes) {
    const status = globalAuthorization(request.nextUrl.pathname, session, rule);

    if (status === AuthorizationStatus.UNAUTHENTICATED) {
      return NextResponse.json(
        { error: 'Authentication required.' },
        { status: 401 },
      );
    }

    if (status === AuthorizationStatus.UNAUTHORIZED) {
      return NextResponse.json(
        { error: 'Forbidden: You do not have permission to access this resource.' },
        { status: 403 },
      );
    }
  }
}
