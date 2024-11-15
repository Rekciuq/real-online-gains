import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";

export const dynamic = "force-static";

export async function GET() {
  const [error, users] = await handlePromiseServer(prisma.user.findMany());
  if (error) {
    return Response.json(error.body, { status: error.status || 500 });
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
    return Response.json(error.body, { status: error.status || 500 });
  }
  return Response.json(response, { status: 201 });
}
