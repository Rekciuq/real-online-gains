import { Prisma } from "@prisma/client";
import ErrorHandler from "@/services/errors/ErrorHandler";
import PrismaError from "@/services/errors/server/PrismaError";
import { PRISMA_ERROR_CODES } from "@/constants/errors/prisma-error-codes";
import { BaseErrorType } from "@/types/common";

// I want to handle all errors here, maybe with codes,
// so return error would look like error: { message: "FULL_I18N_PATH_TO_ERROR", { status: 401 } }
const prismaError = new PrismaError();
export async function handlePromiseServer<T>(
  promise: Promise<Response> | Prisma.PrismaPromise<T>,
): Promise<[BaseErrorType | null, T | Response | null]> {
  try {
    const result = await promise;

    if (result instanceof Response) {
      if (result.ok) {
        return [null, await result.json()];
      } else {
        const error = await result.json();

        return [error, null]
      }
    }

    return [null, result];
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

      const errorPath = ErrorHandler.getFullPath(
        prismaError,
        error.code as keyof typeof PRISMA_ERROR_CODES,
      );

      const option = Array.isArray(error.meta?.target) ? error.meta?.target[0] : error.meta?.target;

      if (option && error.code === "P2002") {
        const options = { property: option as string }

        const customError = {
          body: { message: errorPath, options },
          status: 401,
        };

        return [customError, null];

      }
      throw new Error("Unhandled error, we are not appreciate this here!")
      //
      // const customError = {
      //   body: { message: errorPath, options },
      //   status: 401,
      // };
      //
      // return [customError, null];
    }

    throw new Error("Unhandled error, we are not appreciate this here!");
  }
}
