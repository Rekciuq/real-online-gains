import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handlePromise } from "@/utils/handlePromise";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const [error, users] = await handlePromise(prisma.user.findMany());
  return Response.json(users || error);
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  const [error, response] = await handlePromise(
    prisma.user.create({
      data: { name, email },
    }),
  );
  if (error !== null) {
    console.log(error);
    return Response.json(error.body, { status: 400 });
  }
  return Response.json(response, { status: 201 });
}
