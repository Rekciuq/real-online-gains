import { NextRequest, NextResponse } from "next/server";
import { IMAGE_IS_REQUIRED } from "@/constants/validation/messages/auth";
import {
  HTTP_BAD_REQUEST_CODE,
  HTTP_CREATED_SUCCESS_CODE,
  HTTP_SERVER_ERROR_CODE,
} from "@/constants/api/http-codes";
import { IMAGE_UPLOAD_ERROR } from "@/constants/errors/api-server-errors";
import ImageUploadAPIService from "@/services/server/ImageUploadAPIService";
import { FORM_DATA_KEY_IMAGE } from "@/constants/formDataKeys";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get(FORM_DATA_KEY_IMAGE);

    if (!file || !(file instanceof Blob) || !(file instanceof File)) {
      return NextResponse.json(
        { message: IMAGE_IS_REQUIRED },
        { status: HTTP_BAD_REQUEST_CODE },
      );
    }

    const { error, response } = await ImageUploadAPIService.createImage(file);

    if (error) {
      return NextResponse.json(
        { message: error },
        { status: HTTP_BAD_REQUEST_CODE },
      );
    }

    return NextResponse.json(
      { image: response },
      { status: HTTP_CREATED_SUCCESS_CODE },
    );
  } catch {
    return NextResponse.json(
      { message: IMAGE_UPLOAD_ERROR },
      { status: HTTP_SERVER_ERROR_CODE },
    );
  }
}
