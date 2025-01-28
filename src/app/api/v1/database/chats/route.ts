import {
  HTTP_BAD_REQUEST_CODE,
  HTTP_CREATED_SUCCESS_CODE,
  HTTP_SUCCESS_CODE,
} from "@/constants/api/http-codes";
import { ACCESS_TOKEN } from "@/constants/api/jwt";
import { WRONG_JWT_TOKEN_ERROR } from "@/constants/errors/api-server-errors";
import JWTTokenService from "@/services/server/JWTTokenService";
import MessageServerService from "@/services/server/MessageServerService";
import { NextRequest, NextResponse } from "next/server";

const jwtService = new JWTTokenService();
export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.json(
      { message: WRONG_JWT_TOKEN_ERROR },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }
  const [verifyError, verifiedToken] = await jwtService.verifyToken(
    accessToken,
    ACCESS_TOKEN,
  );

  if (verifyError) {
    return NextResponse.json(
      { message: WRONG_JWT_TOKEN_ERROR },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  const userId = verifiedToken.payload.userId;
  const roleId = verifiedToken.payload.roleId;
  const { error, response } = await MessageServerService.getChats(
    userId,
    roleId,
  );

  if (error) {
    NextResponse.json({ message: error }, { status: HTTP_BAD_REQUEST_CODE });
  }

  return NextResponse.json(response, { status: HTTP_SUCCESS_CODE });
}

export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  try {
    const { userId, trainerId } = requestJson;

    const { error, response } = await MessageServerService.createChat(
      userId,
      trainerId,
    );
    if (error) {
      NextResponse.json({ message: error }, { status: HTTP_BAD_REQUEST_CODE });
    }

    return NextResponse.json(response, { status: HTTP_CREATED_SUCCESS_CODE });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }
}
