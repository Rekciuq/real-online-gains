import {
  User,
  PermissionType,
  PermissionAction,
  Permission,
  Role,
} from "@prisma/client";

export type SeedUser = Omit<User, "id">;
export type SeedPermissionType = Omit<PermissionType, "id">;
export type SeedPermissionAction = Omit<PermissionAction, "id">;
export type SeedPermission = Omit<Permission, "id">;
export type SeedRole = Omit<Role, "id">;
