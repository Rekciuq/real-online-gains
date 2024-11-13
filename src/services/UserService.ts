import { USERS_ROTE } from "@/constants/api/routes";
import { User } from "@/types/models.type";
import { handlePromise } from "@/utils/handlePromise";
import { POST } from "@/constants/api/http-methods";

export class UserService {
  static async createUser(user: Omit<User, "id">) {
    const [error, response] = await handlePromise(
      fetch(USERS_ROTE, {
        method: POST,
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      }),
    );
    // console.log(response);
    return [error, response];
  }
}
