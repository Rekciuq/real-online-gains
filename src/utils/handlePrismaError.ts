import { UNHANDLED_NETWORK_ERROR } from "@/constants/errors/api-server-errors";
import { Prisma } from "@prisma/client";

const handlePrismaError = (error: unknown): string => {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }

  return UNHANDLED_NETWORK_ERROR;
};

export default handlePrismaError;
