import { NextRequest, NextResponse } from "next/server";
import {
  HTTP_BAD_REQUEST_CODE,
  HTTP_CREATED_SUCCESS_CODE,
  HTTP_SERVER_ERROR_CODE,
  HTTP_SUCCESS_CODE,
} from "@/constants/api/http-codes";
import { SeedUser } from "@/seed/types";
import bcrypt from "bcrypt";
import signupSchema from "@/schemas/auth/signup.schema";
import UserService from "@/services/server/UserService";

export async function GET() {
  const { error, response } = await UserService.getUsers();
  if (error) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_SERVER_ERROR_CODE },
    );
  }
  return NextResponse.json(response, { status: HTTP_SUCCESS_CODE });
}

export async function POST(request: NextRequest) {
  const Requestjson = await request.json();

  const parseResult = signupSchema.safeParse(Requestjson);

  if (!parseResult.success) {
    return NextResponse.json(
      { message: parseResult.error.format() },
      {
        status: HTTP_BAD_REQUEST_CODE,
      },
    );
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
    role,
  } = parseResult.data;

  const date = new Date(birthDate);

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const cryptedPassword = bcrypt.hashSync(password, salt);

  const newUser: SeedUser = {
    email,
    password: cryptedPassword,
    imageId: profileImage,
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    bio: bio ?? null,
    gender: gender ?? null,
    birthDate: isNaN(date.getTime()) ? null : date,
    roleId: Number(role),
    isBlocked: false,
  };

  const { error, response } = await UserService.createUser(newUser);

  if (error !== null) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }

  return NextResponse.json(response, { status: HTTP_CREATED_SUCCESS_CODE });
}
