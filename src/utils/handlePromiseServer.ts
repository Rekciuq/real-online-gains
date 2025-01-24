import handlePrismaError from "./handlePrismaError";

export async function handlePromiseServer<T>(
  fn: () => Promise<T>,
): Promise<[string | null, null] | [null, null | T]> {
  try {
    const result = await fn();

    return [null, result];
  } catch (error) {
    return [handlePrismaError(error), null];
  }
}
