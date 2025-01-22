import prisma from "@/lib/prisma";
import { SeedUser } from "@/seed/types";

class UserService {
  static createUser = async (newUser: SeedUser) => {
    const data = { data: newUser };
    try {
      const response = await prisma.user.create(data);
      return [null, response];
    } catch (error) {
      return [error, null];
    }
  };

  static getUser = async (email: string) => {
    try {
      const response = await prisma.user.findUniqueOrThrow({
        where: { email },
      });

      return { error: null, response: response };
    } catch (error) {
      return { error: error, response: null };
    }
  };
}

export default UserService;
