import BaseError from "@/services/errors/BaseError";

class ErrorHandler {
  static getFullPath<T extends BaseError<T["codeErrors"]>>(
    error: T,
    errorCode: keyof T["codeErrors"],
  ) {
    if (error.codeErrors[errorCode]) {
      return error.getPath() + "." + error.codeErrors[errorCode];
    }
    throw new Error("This error is not handled!");
  }
}

export default ErrorHandler;
