import { createNewRoleSeed } from "./createNewRoleSeed"
import * as fileRoles from "./roles.json"

export const createPredefinedRolesSeed = async () => {

  console.log("Seeding roles...")

  for (const role of fileRoles.roles) {
    await createNewRoleSeed({ role })

  }

  console.log("Seeding roles was completed")
}
