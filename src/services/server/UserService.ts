import { DB_ADMIN_ROLE } from "@/constants/database";
import prisma from "@/lib/prisma";
import { SeedUser } from "@/seed/types";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import { User } from "@prisma/client";

class UserService {
  static createUser = async (newUser: SeedUser) => {
    const preparedData = { data: newUser };
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.create(preparedData),
    );

    return { error, response };
  };

  static updateUser = async (user: Partial<User>) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.update({
        where: {
          id: user.id,
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
      prisma.user.findMany({
        include: {
          image: true,
        },
        where: {
          roleId: {
            not: DB_ADMIN_ROLE,
          },
        },
      }),
    );

    return { error, response };
  };

  static deleteUser = async (userId: number) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.user.delete({
        where: {
          id: userId,
        },
      }),
    );

    return { error, response };
  };
}

export default UserService;
