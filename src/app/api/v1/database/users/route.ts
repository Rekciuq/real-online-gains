import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import {
  BAD_REQUEST,
  CREATED_SUCCESS,
  SERVER_ERROR,
} from "@/constants/api/http-codes";
import { SeedUser } from "@/seed/types";
import bcrypt from "bcrypt";
import signupSchema from "@/schemas/auth/signup.schema";
import PrismaService from "@/services/server/PrismaService";

export async function GET() {
  const [error, users] = await handlePromiseServer(prisma.user.findMany());
  if (error) {
    return Response.json(error, { status: SERVER_ERROR });
  }
  return Response.json(users);
}

export async function POST(request: NextRequest) {
  const Requestjson = await request.json();

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

  const date = new Date(birthDate);

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const cryptedPassword = bcrypt.hashSync(password, salt);

  const newUser: SeedUser = {
    email,
    password: cryptedPassword,
    profileImage: Buffer.from(profileImage),
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    bio: bio ?? null,
    gender: gender ?? null,
    birthDate: isNaN(date.getTime()) ? null : date,
    roleId: 1,
    isBlocked: false,
  };

  const [error, response] = await PrismaService.createUser(newUser);

  if (error !== null) {
    return Response.json(error, { status: 401 });
  }
  return Response.json(response, { status: CREATED_SUCCESS });
}
