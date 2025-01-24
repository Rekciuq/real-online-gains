import { createNewPermissionActionSeed } from "./createNewPermissionActionSeed"
import * as fileActions from "./permissionActions.json"

export const createPredefinedPermissionActionsSeed = async () => {

  console.log("Seeding PermissionActions...")

  for (const permissionAction of fileActions.permissionActions) {
    await createNewPermissionActionSeed({ permissionAction: { name: permissionAction } })
  }

  console.log("Seeding PermissionActions was completed")
}
