
import prisma from "@/lib/prisma";
import { SeedRole } from "@/seed/types";

type CreateNewRoleSeedProps = {
  role: SeedRole;
};

export const createNewRoleSeed = async ({ role }: CreateNewRoleSeedProps) => {
  await prisma.role.create({
    data: {
      name: role.name,
    },
  });
};
