import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_TOKEN,
  ATTEMPTED_REFRESH,
  REFRESH_TOKEN,
} from "./constants/api/jwt";
import {
  ADMIN_DASHBOARD_ROUTE,
  API_ROUTE,
  CHATS_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  SIGNUP_ROUTE,
} from "./constants/routes";
import JWTTokenService from "./services/server/JWTTokenService";
import { SESSION_API_ROUTE } from "./constants/api/routes";
import { hasPermission } from "./helpers/hasPermission";

const jwtService = new JWTTokenService();

export async function middleware(request: NextRequest) {
  const checkRoute = request.nextUrl.pathname;

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  const attemptedRefresh = request.cookies.get(ATTEMPTED_REFRESH);

  const nextResponse = NextResponse.next();

  if (checkRoute.startsWith(API_ROUTE)) {
    return nextResponse;
  }

  if (checkRoute === DASHBOARD_ROUTE) {
    return NextResponse.redirect(new URL(CHATS_ROUTE, request.url));
  }

  if (checkRoute.startsWith(LOGOUT_ROUTE)) {
    const nextResponse = NextResponse.next();
    nextResponse.cookies.delete(REFRESH_TOKEN);
    nextResponse.cookies.delete(ACCESS_TOKEN);
    nextResponse.cookies.delete(ATTEMPTED_REFRESH);

    await fetch(SESSION_API_ROUTE, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-middleware-cache": "no-cache",
        Cookie: `access=${accessToken}; refresh=${refreshToken}; ${attemptedRefresh?.value ? "attemptedRefresh=" + attemptedRefresh?.value + ";" : ""}`,
      },
    });

    return nextResponse;
  }

  if ((!accessToken && !refreshToken) || !refreshToken || !accessToken) {
    if (
      checkRoute.startsWith(LOGIN_ROUTE) ||
      checkRoute.startsWith(SIGNUP_ROUTE)
    ) {
      return nextResponse;
    }
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  if (refreshToken && attemptedRefresh) {
    return NextResponse.redirect(new URL(LOGOUT_ROUTE, request.url));
  }

  const [verifyAccessTokenError, verifiedToken] = await jwtService.verifyToken(
    accessToken,
    ACCESS_TOKEN,
  );
  let acccessToken: string = "";

  if (verifyAccessTokenError) {
    const response = await fetch(SESSION_API_ROUTE, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-middleware-cache": "no-cache",
        Cookie: `access=${accessToken}; Path=/; SameSite=None; Secure; refresh=${refreshToken}; Path=/; SameSite=None; Secure; ${attemptedRefresh?.value ? "attemptedRefresh=" + attemptedRefresh?.value + "; Path=/; SameSite=None; Secure;" : ""}`,
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL(LOGOUT_ROUTE, request.url));
    }

    const { tokens } = await response.json();
    acccessToken = tokens.accessToken;

    nextResponse.cookies.delete(ACCESS_TOKEN);
    nextResponse.cookies.delete(REFRESH_TOKEN);

    nextResponse.cookies.set(ACCESS_TOKEN, tokens.accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    nextResponse.cookies.set(REFRESH_TOKEN, tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  if (
    checkRoute.startsWith(LOGIN_ROUTE) ||
    checkRoute.startsWith(SIGNUP_ROUTE)
  ) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
  }

  if (checkRoute.startsWith(ADMIN_DASHBOARD_ROUTE)) {
    let roleId: number;
    try {
      if (verifyAccessTokenError && acccessToken) {
        const [, retriedVerifiedToken] = await jwtService.verifyToken(
          acccessToken,
          ACCESS_TOKEN,
        );
        roleId = retriedVerifiedToken.payload.roleId;
      } else {
        roleId = verifiedToken.payload.roleId;
      }
      if (!hasPermission(roleId, "view:adminDashboard")) {
        return NextResponse.redirect(new URL(LOGOUT_ROUTE, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL(LOGOUT_ROUTE, request.url));
    }
  }

  return nextResponse;
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
