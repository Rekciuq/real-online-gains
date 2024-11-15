import ServerError from "@/services/errors/server/ServerError";
import { PRISMA } from "@/constants/i18n/errors";
import { PRISMA_ERROR_CODES } from "@/constants/errors/prisma-error-codes";

class PrismaError extends ServerError<typeof PRISMA_ERROR_CODES> {
  constructor() {
    super(PRISMA_ERROR_CODES);
  }

  getPath() {
    return super.getPath() + "." + PRISMA;
  }
}

export default PrismaError;
