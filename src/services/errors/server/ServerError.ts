import BaseError from "@/services/errors/BaseError";
import { SERVER } from "@/constants/i18n/errors";

class ServerError<
  TErrorCodes extends Record<string, string>,
> extends BaseError<TErrorCodes> {
  getPath() {
    return super.getPath() + "." + SERVER;
  }
}

export default ServerError;
