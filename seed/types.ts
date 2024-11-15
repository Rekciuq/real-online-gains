import { User } from "@prisma/client";

export type SeedUser = Omit<User, "id">;
