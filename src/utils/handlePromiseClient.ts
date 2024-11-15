import { NETWORK_ERROR } from "@/constants/errors/api-server-errors";
import { BaseErrorBodyType } from "@/types/common";

export async function handlePromiseClient(
  promise: Promise<Response>,
): Promise<[BaseErrorBodyType | null, Response | null]> {
  try {
    const result = await promise;

    if (!result.ok) {
      const error: BaseErrorBodyType = await result.json();
      return [error, null]
    }


    return [null, await result.json()];
  } catch {
    throw new Error(NETWORK_ERROR)
  }
}

