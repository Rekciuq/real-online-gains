import prisma from "@/lib/prisma";
import { createRandomUsersSeed } from "@/seed/profiles/users/createRandomUsersSeed";
import { createPredefinedRolesSeed } from "./roles/createPredefinedRolesSeed";
import { createPredefinedPermissionTypesSeed } from "./permissions/permissionTypes/createPredefinedPermissionTypesSeed";
import { createPredefinedPermissionActionsSeed } from "./permissions/permissionActions/createPredefinedPermissionActionsSeed";
import createPredefinedPermissionsSeed from "./permissions/createPredefinedPermissionsSeed";

const main = async () => {
  prisma.$connect();
  console.log("Seeding database...");

  await createPredefinedPermissionTypesSeed();
  await createPredefinedPermissionActionsSeed();
  await createPredefinedRolesSeed();
  await createPredefinedPermissionsSeed();
  await createRandomUsersSeed();

  console.log("Seeding database was successfully!");
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
