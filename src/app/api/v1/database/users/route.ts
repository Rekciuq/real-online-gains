import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import { CREATED_SUCCESS, SERVER_ERROR } from "@/constants/api/http-codes";

export const dynamic = "force-static";

export async function GET() {
  const [error, users] = await handlePromiseServer(prisma.user.findMany());
  if (error) {
    return Response.json(error.body, { status: error.status || SERVER_ERROR });
  }
  return Response.json(users || {});
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  const [error, response] = await handlePromiseServer(
    prisma.user.create({
      data: { name, email },
    }),
  );
  if (error !== null) {
    return Response.json(error.body, { status: error.status || SERVER_ERROR });
  }
  return Response.json(response, { status: CREATED_SUCCESS });
}
