import { Prisma } from "@prisma/client";
import ErrorHandler from "@/services/errors/ErrorHandler";
import PrismaError from "@/services/errors/server/PrismaError";
import { PRISMA_ERROR_CODES } from "@/constants/errors/prisma-error-codes";

// I want to handle all errors here, maybe with codes,
// so return error would look like error: { message: "FULL_I18N_PATH_TO_ERROR", { status: 401 } }
const prismaError = new PrismaError();
export async function handlePromise<T>(
  promise: Promise<Response> | Prisma.PrismaPromise<T>,
) {
  try {
    const result = await promise;

    if (result instanceof Response && !result.ok) {
      throw new Error(await result.text());
    }
    return [null, result];
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorPath = ErrorHandler.getFullPath(
        prismaError,
        error.code as keyof typeof PRISMA_ERROR_CODES,
      );
      const options = error.meta?.target;

      const customError = {
        body: { message: errorPath, options },
        status: 401,
      };
      return [customError, null];
    }
    // throw new Error("Unhandled error, we are not appreciate this here!");
  }
}
