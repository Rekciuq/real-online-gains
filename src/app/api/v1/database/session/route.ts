import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import loginSchema from "@/schemas/auth/login.schema";
import { BAD_REQUEST, SUCCESS } from "@/constants/api/http-codes";
import UserService from "@/services/server/UserService";
import JWTTokenService from "@/services/server/JWTTokenService";
import { cookies } from "next/headers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/api/jwt";
import SessionService from "@/services/server/SessionService";

const jwtService = new JWTTokenService();
export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const parseResult = loginSchema.safeParse(requestJson);

  if (!parseResult.success) {
    return Response.json(parseResult.error.format(), { status: BAD_REQUEST });
  }

  const { email, password } = parseResult.data;

  const { error, response } = await UserService.getUser(email);

  if (error) {
    return Response.json(error, { status: BAD_REQUEST });
  }

  const isMatching = bcrypt.compareSync(password, response!.password);
  if (!isMatching) {
    return Response.json({ status: BAD_REQUEST });
  }
  const tokens = jwtService.generateTokens(response!.id);

  const cookiesStore = await cookies();
  cookiesStore.set(ACCESS_TOKEN, tokens.accessToken);
  cookiesStore.set(REFRESH_TOKEN, tokens.refreshToken);
  const [sessionError] = await SessionService.createSession(
    tokens.refreshToken,
    response!.id,
  );

  if (sessionError) {
    return Response.json({ status: BAD_REQUEST });
  }

  return Response.json(tokens, { status: 200 });
}

export async function PUT() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get(REFRESH_TOKEN)?.value;

  if (refreshToken) {
    const [verifyError, verifiedToken] = jwtService.verifyToken(
      refreshToken,
      "refresh",
    );

    if (verifyError) {
      return Response.json({ status: BAD_REQUEST });
    }

    cookiesStore.delete(REFRESH_TOKEN);
    cookiesStore.delete(ACCESS_TOKEN);

    const tokens = jwtService.generateTokens(
      (verifiedToken as { userId: number }).userId,
    );

    cookiesStore.set(ACCESS_TOKEN, tokens.accessToken);
    cookiesStore.set(REFRESH_TOKEN, tokens.refreshToken);

    const [error] = await SessionService.updateSession(
      refreshToken,
      tokens.refreshToken,
      (verifiedToken as { userId: number }).userId,
    );

    if (error) {
      return Response.json(error, { status: BAD_REQUEST });
    }
    return Response.json({ status: SUCCESS });
  }

  return Response.json({ status: BAD_REQUEST });
}

export async function DELETE() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get(REFRESH_TOKEN)?.value;

  if (refreshToken) {
    cookiesStore.delete(REFRESH_TOKEN);
    cookiesStore.delete(ACCESS_TOKEN);

    const [error] = await SessionService.deleteSession(refreshToken);
    if (error) {
      return Response.json(error, { status: BAD_REQUEST });
    }
    return Response.json({ status: SUCCESS });
  }

  return Response.json({ status: BAD_REQUEST });
}
