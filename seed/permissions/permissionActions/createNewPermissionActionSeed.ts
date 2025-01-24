import { SeedPermissionAction } from "../../types"
import prisma from "@/lib/prisma";

type PermissionActionProps = {
  permissionAction: SeedPermissionAction
}

export const createNewPermissionActionSeed = async ({ permissionAction }: PermissionActionProps) => {

  await prisma.permissionAction.create({
    data: {
      name: permissionAction.name,
    },
  });
}
