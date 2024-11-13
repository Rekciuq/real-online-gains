import { Prisma } from "@prisma/client";

export async function handlePromise<T>(promise: Promise<T>) {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return ["damn bro", null];
    }
    return [error, null];
  }
}
