import { UserRole } from "./enums/role.enum";

export interface CreateUserParams {
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserPrams {
  password?: string;
}
