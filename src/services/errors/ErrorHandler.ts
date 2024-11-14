import BaseError from "@/services/errors/BaseError";

class ErrorHandler {
  static getFullPath<T extends Record<string, string>, E extends BaseError<T>>(
    error: E,
    errorCode: keyof E["codeErrors"],
  ) {
    if (error.codeErrors[errorCode]) {
      return error.getPath() + "." + error.codeErrors[errorCode];
    }
    throw new Error("This error is not handled!");
  }
}

export default ErrorHandler;
