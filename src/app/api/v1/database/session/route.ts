import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import loginSchema from "@/schemas/auth/login.schema";
import {
  HTTP_BAD_REQUEST_CODE,
  HTTP_SUCCESS_CODE,
} from "@/constants/api/http-codes";
import UserService from "@/services/server/UserService";
import JWTTokenService from "@/services/server/JWTTokenService";
import {
  ACCESS_TOKEN,
  ATTEMPTED_REFRESH,
  REFRESH_TOKEN,
} from "@/constants/api/jwt";
import SessionService from "@/services/server/SessionService";
import {
  JWT_TOKEN_DOESNT_EXIST_ERROR,
  WRONG_CREDENTIALS_ERROR,
  WRONG_JWT_TOKEN_ERROR,
} from "@/constants/errors/api-server-errors";
import { LOGGED_OUT } from "@/constants/success/api";
import { TOAST_MESSAGE_ERROR_BLOCKED } from "@/constants/toastMessages/error";

const jwtService = new JWTTokenService();
export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const parseResult = loginSchema.safeParse(requestJson);

  if (!parseResult.success) {
    return NextResponse.json(
      { message: parseResult.error.format() },
      {
        status: HTTP_BAD_REQUEST_CODE,
      },
    );
  }

  const { email, password } = parseResult.data;

  const { error, response } = await UserService.getUser(email);

  if (error) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  if (response!.isBlocked) {
    return NextResponse.json(
      { message: TOAST_MESSAGE_ERROR_BLOCKED },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  const isMatching = bcrypt.compareSync(password, response!.password);

  if (!isMatching) {
    return NextResponse.json(
      { message: WRONG_CREDENTIALS_ERROR },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  const tokens = jwtService.generateTokens(response!.id, response!.roleId);

  const nextResponse = NextResponse.json(
    { ...response },
    { status: HTTP_SUCCESS_CODE },
  );

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

  const { error: sessionError } = await SessionService.createSession(
    tokens.refreshToken,
    response!.id,
  );

  if (sessionError) {
    return NextResponse.json(
      { message: sessionError },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  return nextResponse;
}

export async function PUT(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    const nextResponse = NextResponse.json(
      { message: JWT_TOKEN_DOESNT_EXIST_ERROR },
      {
        status: HTTP_BAD_REQUEST_CODE,
      },
    );

    nextResponse.cookies.set(ATTEMPTED_REFRESH, "true", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return nextResponse;
  }

  const [verifyError, verifiedToken] = await jwtService.verifyToken(
    refreshToken,
    REFRESH_TOKEN,
  );

  if (verifyError) {
    const nextResponse = NextResponse.json(
      { message: WRONG_JWT_TOKEN_ERROR },
      {
        status: HTTP_BAD_REQUEST_CODE,
      },
    );

    nextResponse.cookies.set(ATTEMPTED_REFRESH, "true", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return nextResponse;
  }

  const tokens = jwtService.generateTokens(
    verifiedToken.payload.userId,
    verifiedToken.payload.roleId,
  );

  const nextResponse = NextResponse.json(
    { tokens },
    { status: HTTP_SUCCESS_CODE },
  );

  const { error } = await SessionService.updateSession(
    refreshToken,
    tokens.refreshToken,
    verifiedToken.payload.userId,
  );

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

  if (error) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  return nextResponse;
}

export async function DELETE(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  const nextResponse = NextResponse.json(
    { message: LOGGED_OUT },
    { status: HTTP_SUCCESS_CODE },
  );

  if (refreshToken) {
    const { error } = await SessionService.deleteSession(refreshToken);

    if (error) {
      return NextResponse.json(
        { message: error },
        { status: HTTP_BAD_REQUEST_CODE },
      );
    }
    return nextResponse;
  }

  return nextResponse;
}
