import { USERS_ROUTE } from "@/constants/api/routes";
import { User } from "@/types/models.type";
import { POST } from "@/constants/api/http-methods";
import { handlePromiseClient } from "@/utils/handlePromiseClient";
import { BaseErrorBodyType } from "@/types/common";

type UserResponse = [BaseErrorBodyType | null, Response | null];

export class UserService {
  static async createUser(user: Omit<User, "id">): Promise<UserResponse> {
    const [error, response]: UserResponse = await handlePromiseClient(
      fetch(USERS_ROUTE, {
        method: POST,
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      }),
    );

    return [error, response];
  }
}
