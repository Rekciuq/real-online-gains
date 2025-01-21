import prisma from "@/lib/prisma";
import { SeedUser } from "@/seed/types";

class PrismaService {
  static createUser = async (newUser: SeedUser) => {
    const data = { data: newUser };
    try {
      const response = await prisma.user.create(data);
      return [null, response];
    } catch (error) {
      return [error, null];
    }
  };
}

export default PrismaService;
