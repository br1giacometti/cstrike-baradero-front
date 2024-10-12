import { isAxiosError } from "axios";
import { CreateGameSchema } from "Game/schemas/createGameSchema";
import GameClient from "../client";

const createGame = async (body: CreateGameSchema) => {
  console.log(body);
  try {
    const response = await GameClient.post("/create", body);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createGame;
