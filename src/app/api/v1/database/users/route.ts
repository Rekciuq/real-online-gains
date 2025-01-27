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
import editProfileSchema from "@/schemas/profile/editProfile.schema";

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
  const requestJson = await request.json();

  const parseResult = signupSchema.safeParse(requestJson);

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
    role,
  } = parseResult.data;

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
    birthDate: requestJson?.birthDate ? new Date(requestJson.birthDate) : null,
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

export async function PUT(request: NextRequest) {
  const requestJson = await request.json();

  const parseResult = editProfileSchema.safeParse(requestJson);
  const userId = requestJson.id;

  if (!parseResult.success) {
    return NextResponse.json(
      { message: parseResult.error.format() },
      {
        status: HTTP_BAD_REQUEST_CODE,
      },
    );
  }

  const parsedResults = parseResult.data;

  const updatedUser = {
    ...parsedResults,
    id: userId,
    birthDate: requestJson?.birthDate ? new Date(requestJson.birthDate) : null,
    imageId: requestJson?.imageId ? requestJson.imageId : null,
  };

  const { error, response } = await UserService.updateUser(updatedUser);
  if (error !== null) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_BAD_REQUEST_CODE },
    );
  }
  return NextResponse.json(
    { ...response },
    { status: HTTP_CREATED_SUCCESS_CODE },
  );
}
