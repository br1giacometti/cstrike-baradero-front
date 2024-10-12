import { isAxiosError } from "axios";

import playerClient from "../client";
import { CreatePlayerSchema } from "Player/schemas/createPlayerSchema";

const createPlayer = async (body: CreatePlayerSchema) => {
  try {
    const response = await playerClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createPlayer;
