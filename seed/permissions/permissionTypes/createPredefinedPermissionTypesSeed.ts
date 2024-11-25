import { createNewPermissionTypeSeed } from "./createNewPermissionTypeSeed"
import * as filePermissionTypes from "./permissionTypes.json"

export const createPredefinedPermissionTypesSeed = async () => {

  console.log("Seeding PermissionTypes...")

  for (const permissionType of filePermissionTypes.permissionTypes) {

    await createNewPermissionTypeSeed({ permissionType: { name: permissionType } })
  }

  console.log("Seeding PermissionTypes was completed")
}
