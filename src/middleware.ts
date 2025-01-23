import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/api/jwt";
import { DASHBOARD, LOGIN, LOGOUT, SIGNUP } from "./constants/routes";
import JWTTokenService from "./services/server/JWTTokenService";
import { SESSION_ROUTE } from "./constants/api/routes";

const jwtService = new JWTTokenService();

export async function middleware(request: NextRequest) {
  console.log("I'm in middleware");
  const checkRoute = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;
  console.log(request.cookies);

  // LOGOUT handling
  if (checkRoute.startsWith(LOGOUT)) {
    cookieStore.delete(ACCESS_TOKEN);
    cookieStore.delete(REFRESH_TOKEN);
    await fetch(SESSION_ROUTE, { method: "DELETE" });
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  // console.log(request.cookies);
  // All other routes (except logout): Check for access token
  if (!accessToken) {
    if (
      checkRoute.startsWith(LOGIN) ||
      checkRoute.startsWith(SIGNUP) ||
      checkRoute.startsWith("/api") // Important: Don't redirect API requests!
    ) {
      return NextResponse.next(); // Allow access to login, signup, and API routes
    }
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  // Verify access token
  const [verifyAccessTokenError] = jwtService.verifyToken(
    accessToken,
    "access",
  );
  if (verifyAccessTokenError) {
    const updatedResponse = await fetch(SESSION_ROUTE, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Cookie: `access=${accessToken}; refreshToken=${refreshToken}`,
      },
    });
    // console.log(updatedResponse.status);
    if (!updatedResponse.ok) {
      return NextResponse.redirect(new URL(LOGIN, request.url));
    }
  }

  // Redirect logged-in users from login/signup to dashboard
  if (checkRoute.startsWith(LOGIN) || checkRoute.startsWith(SIGNUP)) {
    return NextResponse.redirect(new URL(DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"], // Match all routes except Next.js internal routes
};
