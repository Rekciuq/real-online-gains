import { Prisma } from "@prisma/client";
import handlePrismaError from "./handlePrismaError";

export async function handlePromiseServer<T>(
  promise: Prisma.PrismaPromise<T>,
): Promise<[string | null, T | null]> {
  try {
    const result = await promise;

    return [null, result];
  } catch (error) {
    return [handlePrismaError(error), null];
  }
}
