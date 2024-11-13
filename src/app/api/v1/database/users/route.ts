import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handlePromise } from "@/utils/handlePromise";
import { Prisma } from "@prisma/client";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const [error, users] = await handlePromise(prisma.user.findMany());
  return Response.json(users || error);
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  try {
    const response = await prisma.user.create({
      data: { name, email },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("here");
    }
  }

  return Response.json("thing");
}
