import prisma from "@/lib/prisma";
import { SeedUser } from "@/seed/types";
import { handlePromiseServer } from "@/utils/handlePromiseServer";

class UserService {
  static createUser = async (newUser: SeedUser) => {
    const preparedData = { data: newUser };
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.create(preparedData),
    );

    return { error, response };
  };

  static getUser = async (email: string) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.findUniqueOrThrow({
        where: { email },
      }),
    );

    return { error, response };
  };

  static getUsers = async () => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.findMany(),
    );

    return { error, response };
  };
}

export default UserService;
