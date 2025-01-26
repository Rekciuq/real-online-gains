"use client";
import { USERS_API_ROUTE } from "@/constants/api/routes";
import HttpService from "../HttpService";
import { SeedUser } from "@/seed/types";
import { User } from "@prisma/client";
import { SignupSchemaType } from "@/types/schemas";

class UserService extends HttpService {
  constructor() {
    super(USERS_API_ROUTE);
  }
  getOne = (id: number) => this.get<User>({ url: `/${id}` });
  getAll = () => this.get<User[]>({});
  createUser = (newUser: SignupSchemaType) =>
    this.post<SignupSchemaType>({ data: newUser });
  updateUser = (updatedUser: User) => this.put<SeedUser>({ data: updatedUser });
  deleteUser = (id: number) => this.delete({ url: `/${id}` });
}

export default UserService;
