import createNewPermissionSeed from "./createNewPermissionSeed";
import * as permissionsFile from "./permissions.json";

const createPredefinedPermissionsSeed = async () => {
  for (const permission of permissionsFile.permissions) {
    await createNewPermissionSeed({
      permission: {
        roleId: Number(permission.roleId),
        permissionActionId: Number(permission.permissionActionId),
        permissionTypeId: Number(permission.permissionTypeId),
      },
    });
  }
};

export default createPredefinedPermissionsSeed;
