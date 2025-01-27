import {
  HTTP_SERVER_ERROR_CODE,
  HTTP_SUCCESS_CODE,
} from "@/constants/api/http-codes";
import { USER_NOT_FOUND_ERROR } from "@/constants/errors/api-server-errors";
import UserService from "@/services/server/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { error, response } = await UserService.deleteUser(Number(id));

  if (error) {
    return NextResponse.json(
      { message: USER_NOT_FOUND_ERROR },
      { status: HTTP_SERVER_ERROR_CODE },
    );
  }

  return NextResponse.json({ ...response }, { status: HTTP_SUCCESS_CODE });
}
