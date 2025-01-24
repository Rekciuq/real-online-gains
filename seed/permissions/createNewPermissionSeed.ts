import prisma from "@/lib/prisma";
import { SeedPermission } from "../types";

type PermissionProps = {
  permission: SeedPermission;
};

const createNewPermissionSeed = async ({ permission }: PermissionProps) => {
  console.log("Seeding permissions...");

  await prisma.permission.create({
    data: {
      permissionTypeId: permission.permissionTypeId,
      permissionActionId: permission.permissionActionId,
      roleId: permission.roleId,
    },
  });

  console.log("Seeding permissions was completed");
};

export default createNewPermissionSeed;
