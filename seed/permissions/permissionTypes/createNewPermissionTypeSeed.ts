import prisma from "@/lib/prisma";
import { SeedPermissionType } from "@/seed/types";

type PermissionTypeProps = {
  permissionType: SeedPermissionType
}

export const createNewPermissionTypeSeed = async ({ permissionType }: PermissionTypeProps) => {

  await prisma.permissionType.create({
    data: {
      name: permissionType.name
    },
  });
}
