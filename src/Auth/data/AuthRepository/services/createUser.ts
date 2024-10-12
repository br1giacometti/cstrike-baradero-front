import { isAxiosError } from "axios";

import userClient from "../client";
import { CreateUserSchema } from "Auth/schemas/CreateUserSchema";

const createUser = async (body: CreateUserSchema) => {
  try {
    const response = await userClient.post("/Register", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createUser;
