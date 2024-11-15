import { PRISMA_CLIENT_ERROR_P2002 } from "@/constants/errors/prisma-client-errors";
import BaseError from "@/services/errors/BaseError";

class ErrorHandler {
  static getFullPath<T extends Record<string, string>, E extends BaseError<T>>(
    error: E,
    errorCode: keyof E["codeErrors"],
  ) {
    if (error.codeErrors[errorCode]) {
      return error.getPath() + "." + error.codeErrors[errorCode];
    }
    throw new Error(PRISMA_CLIENT_ERROR_P2002);
  }
}

export default ErrorHandler;
