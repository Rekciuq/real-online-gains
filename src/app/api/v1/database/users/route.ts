import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import {
  BAD_REQUEST,
  CREATED_SUCCESS,
  SERVER_ERROR,
} from "@/constants/api/http-codes";
import { SeedUser } from "@/seed/types";
import signupSchema from "@/schemas/auth/signup.schema";
import ImageService from "@/services/ImageService";

export async function GET() {
  const [error, users] = await handlePromiseServer(prisma.user.findMany());
  if (error) {
    return Response.json(error, { status: SERVER_ERROR });
  }
  return Response.json(users);
}

export async function POST(request: NextRequest) {
  const Requestjson = await request.json();

  console.log(Requestjson);
  const parseResult = signupSchema.safeParse(Requestjson);

  if (!parseResult.success) {
    return Response.json(parseResult.error.format(), { status: BAD_REQUEST });
  }

  const {
    email,
    password,
    profileImage,
    firstName,
    lastName,
    bio,
    gender,
    birthDate,
  } = parseResult.data;

  const newUser: SeedUser = {
    email,
    password,
    profileImage: await ImageService.convertFromFileToBytes(profileImage),
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    bio: bio ?? null,
    gender: gender ?? null,
    birthDate: new Date(birthDate) ?? null,
    roleId: 0,
    isBlocked: false,
  };

  const [error] = await handlePromiseServer(
    prisma.user.create({
      data: newUser,
    }),
  );

  if (error !== null) {
    console.log(error);
    return Response.json(error, { status: SERVER_ERROR });
  }
  return Response.json({ status: CREATED_SUCCESS });
}
