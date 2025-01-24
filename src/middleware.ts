import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_TOKEN,
  ATTEMPTED_REFRESH,
  REFRESH_TOKEN,
} from "./constants/api/jwt";
import {
  API_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  SIGNUP_ROUTE,
} from "./constants/routes";
import JWTTokenService from "./services/server/JWTTokenService";
import { SESSION_ROUTE } from "./constants/api/routes";

const jwtService = new JWTTokenService();

export async function middleware(request: NextRequest) {
  const checkRoute = request.nextUrl.pathname;

  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  const attemptedRefresh = request.cookies.get(ATTEMPTED_REFRESH);

  if (checkRoute.startsWith(API_ROUTE)) {
    return NextResponse.next();
  }

  if (checkRoute.startsWith(LOGOUT_ROUTE)) {
    const nextResponse = NextResponse.redirect(
      new URL(LOGIN_ROUTE, request.url),
    );
    nextResponse.cookies.delete(REFRESH_TOKEN);
    nextResponse.cookies.delete(ACCESS_TOKEN);
    nextResponse.cookies.delete(ATTEMPTED_REFRESH);

    await fetch(SESSION_ROUTE, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Cookie: `access=${accessToken}; refresh=${refreshToken}; attemptedRefresh=${attemptedRefresh};`,
      },
    });

    return nextResponse;
  }

  if ((!accessToken && !refreshToken) || !refreshToken || !accessToken) {
    if (
      checkRoute.startsWith(LOGIN_ROUTE) ||
      checkRoute.startsWith(SIGNUP_ROUTE)
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  if (refreshToken && attemptedRefresh) {
    return NextResponse.redirect(new URL(LOGOUT_ROUTE, request.url));
  }

  if (refreshToken) {
    const [verifyAccessTokenError] = await jwtService.verifyToken(
      accessToken,
      ACCESS_TOKEN,
    );

    if (verifyAccessTokenError) {
      const updatedResponse = await fetch(SESSION_ROUTE, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Cookie: `access=${accessToken}; refresh=${refreshToken}; attemptedRefresh=${attemptedRefresh}`,
        },
      });

      if (!updatedResponse.ok) {
        return NextResponse.redirect(new URL(LOGOUT_ROUTE, request.url));
      }
    }
  }

  if (
    checkRoute.startsWith(LOGIN_ROUTE) ||
    checkRoute.startsWith(SIGNUP_ROUTE)
  ) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
