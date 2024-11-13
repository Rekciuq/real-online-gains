import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  const user = await prisma.user.create({
    data: { name, email },
  });
  return Response.json(user);
}
