import {
  HTTP_SERVER_ERROR_CODE,
  HTTP_SUCCESS_CODE,
} from "@/constants/api/http-codes";
import { IMAGE_DELETE_ERROR } from "@/constants/errors/api-server-errors";
import ImageAPIService from "@/services/server/ImageAPIService";
import ImageUploadAPIService from "@/services/server/ImageUploadAPIService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, response } = await ImageAPIService.getImage(Number(id));
  if (error) {
    return NextResponse.json(
      { message: error },
      { status: HTTP_SERVER_ERROR_CODE },
    );
  }
  return NextResponse.json(response, { status: HTTP_SUCCESS_CODE });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { error: imageError, response: imageResponse } =
      await ImageAPIService.getImage(Number(id));

    if (imageError) {
      return NextResponse.json(
        { message: IMAGE_DELETE_ERROR },
        { status: HTTP_SERVER_ERROR_CODE },
      );
    }

    const { error, response } = await ImageUploadAPIService.deleteImage(
      imageResponse!,
    );

    if (error) {
      return NextResponse.json(
        { message: IMAGE_DELETE_ERROR },
        { status: HTTP_SERVER_ERROR_CODE },
      );
    }

    return NextResponse.json({ ...response }, { status: HTTP_SUCCESS_CODE });
  } catch {
    return NextResponse.json(
      { message: IMAGE_DELETE_ERROR },
      { status: HTTP_SERVER_ERROR_CODE },
    );
  }
}
