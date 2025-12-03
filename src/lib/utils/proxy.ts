import { UserRole } from "@prisma/client";
import { Session, User } from "better-auth";
import { NextRequest, NextResponse } from "next/server";

export interface RouteProtectionRule {
  path: string;
  roles?: string[];
  redirects: {
    unauthenticated: string;
    unauthorized: string;
    emailNotVerified?: string;
  };
  requireEmailVerified?: boolean;
}

export enum AuthorizationStatus {
  AUTHORIZED,
  UNAUTHENTICATED,
  UNAUTHORIZED,
  PATH_MISMATCH,
  EMAIL_NOT_VERIFIED,
}

export function redirect(request: NextRequest, path: string): NextResponse {
  return NextResponse.redirect(new URL(path, request.url));
}

export function globalAuthorization(
  pathname: string,
  session: { user: User & { role: UserRole; emailVerified?: boolean }; session: Session } | any,
  rule: RouteProtectionRule,
): AuthorizationStatus {
  if (!pathname.startsWith(rule.path)) {
    return AuthorizationStatus.PATH_MISMATCH;
  }

  if (!session) {
    return AuthorizationStatus.UNAUTHENTICATED;
  }

  if (rule.requireEmailVerified && !session.user?.emailVerified) {
    return AuthorizationStatus.EMAIL_NOT_VERIFIED;
  }

  if (rule.roles && (!session.user?.role || !rule.roles.includes(session.user.role))) {
    return AuthorizationStatus.UNAUTHORIZED;
  }

  return AuthorizationStatus.AUTHORIZED;
}
