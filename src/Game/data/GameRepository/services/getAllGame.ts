import GameClient from "../client";
import { Game } from "../types";

const getAllGame = async () => {
  const response = await GameClient.get<Game[]>("/");

  return response.data;
};

export default getAllGame;
