import { ERRORS } from "@/constants/i18n/errors";

class BaseError<TErrorCodes extends Record<string, string>> {
  public codeErrors: TErrorCodes;

  constructor(codeErrors: TErrorCodes) {
    this.codeErrors = codeErrors;
  }
  getPath() {
    return ERRORS;
  }
}

export default BaseError;
