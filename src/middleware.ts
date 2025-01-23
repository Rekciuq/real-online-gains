import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/api/jwt";
import { DASHBOARD, LOGIN, LOGOUT, SIGNUP } from "./constants/routes";
import JWTTokenService from "./services/server/JWTTokenService";
import { SESSION_ROUTE } from "./constants/api/routes";

const jwtService = new JWTTokenService();
export async function middleware(request: NextRequest) {
  console.log("I'm in the middleware");
  const checkRoute = request.nextUrl.pathname;
  const cookieStore = await cookies();

  if (checkRoute.startsWith(LOGOUT)) {
    cookieStore.delete(ACCESS_TOKEN);
    cookieStore.delete(REFRESH_TOKEN);

    await fetch(SESSION_ROUTE, {
      method: "DELETE",
    });

    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  const [verifyAccessTokenError] = jwtService.verifyToken(
    accessToken,
    "access",
  );

  if (verifyAccessTokenError) {
    const updatedResponse = await fetch(SESSION_ROUTE, {
      method: "PUT",
    });

    if (!updatedResponse.ok) {
      return NextResponse.redirect(new URL(LOGIN, request.url));
    }
  }

  if (checkRoute.startsWith(LOGIN) || checkRoute.startsWith(SIGNUP)) {
    return NextResponse.redirect(new URL(DASHBOARD, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*", "/:path*"],
};
