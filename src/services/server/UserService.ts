import prisma from "@/lib/prisma";
import { SeedUser } from "@/seed/types";
import { EditProfileType } from "@/types/schemas";
import { handlePromiseServer } from "@/utils/handlePromiseServer";

class UserService {
  static createUser = async (newUser: SeedUser) => {
    const preparedData = { data: newUser };
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.create(preparedData),
    );

    return { error, response };
  };

  static updateUser = async (user: EditProfileType) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.update({
        where: {
          email: user.email,
        },
        data: user,
      }),
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
