import GameClient from "../client";
import { Game } from "../types";

const getGameById = async (GameId: number) => {
  const response = await GameClient.get<Game>(`/${GameId}`);

  return response.data;
};

export default getGameById;
