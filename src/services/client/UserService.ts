"use client";
import { USERS_API_ROUTE } from "@/constants/api/routes";
import HttpService from "../HttpService";
import { User } from "@prisma/client";
import { EditProfileType, SignupSchemaType } from "@/types/schemas";
import { UserWithImage } from "@/types/common";

class UserService extends HttpService {
  constructor() {
    super(USERS_API_ROUTE);
  }
  getOne = (id: number) => this.get<User>({ url: `/${id}` });
  getAll = () => this.get<UserWithImage[]>({});
  createUser = (newUser: SignupSchemaType) =>
    this.post<SignupSchemaType>({ data: newUser });
  updateUser = (updatedUser: EditProfileType | User) =>
    this.put<User>({ data: updatedUser as User });
  deleteUser = (id: number) => this.delete({ url: `/${id}` });
}

export default UserService;
