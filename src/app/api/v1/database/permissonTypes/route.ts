import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import { SERVER_ERROR } from "@/constants/api/http-codes";

export async function GET() {
  const [error, users] = await handlePromiseServer(
    prisma.permissionType.findMany(),
  );
  if (error) {
    return Response.json(error.body, { status: error.status || SERVER_ERROR });
  }
  return Response.json(users || {});
}
