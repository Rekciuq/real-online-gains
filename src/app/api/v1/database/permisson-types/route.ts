import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import { HTTP_SERVER_ERROR_CODE } from "@/constants/api/http-codes";
import { NextResponse } from "next/server";

export async function GET() {
  const [error, users] = await handlePromiseServer(
    prisma.permissionType.findMany(),
  );
  if (error) {
    return NextResponse.json(error.body, {
      status: error.status || HTTP_SERVER_ERROR_CODE,
    });
  }
  return Response.json(users || {});
}
