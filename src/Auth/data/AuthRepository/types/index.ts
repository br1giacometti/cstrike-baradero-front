import { CreateUserSchema } from "Auth/schemas/CreateUserSchema";
import { User } from "Auth/types";

export interface UserRepository {
  createUser: (body: CreateUserSchema) => Promise<User>;
}
