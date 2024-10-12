import { UserRepository } from "./types";
import createUser from "./services/createUser";
import userClient from "./client";

const createUserRepository = (userToken: string): UserRepository => {
  userClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createUser,
  };
};

export default createUserRepository;
