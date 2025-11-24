import { User, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface RouteProtectionRule {
  path: string; 
  roles: UserRole[]; 
  redirects: {
    unauthenticated: string; 
    unauthorized: string;    
  };
}

export function handleRouteAuthorization(
  request: NextRequest,
  session: { user: Partial<User> } | null | undefined,
  rule: RouteProtectionRule,
): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(rule.path)) {
    return null;
  }

  if (!session) {
    return NextResponse.redirect(new URL(rule.redirects.unauthenticated, request.url));
  }

  const userRole = session.user?.role;
  if (!userRole || !rule.roles.includes(userRole)) {
    return NextResponse.redirect(new URL(rule.redirects.unauthorized, request.url));
  }

  return null;
}