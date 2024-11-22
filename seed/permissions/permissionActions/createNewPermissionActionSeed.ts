import prisma from "@/lib/prisma";
import { SeedUser } from "@/seed/types";

type CreateNewUserSeedProps = {
  user: SeedUser;
};

export const createNewUserSeed = async ({ user }: CreateNewUserSeedProps) => {
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
    },
  });
};
