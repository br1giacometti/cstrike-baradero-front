import playerClient from "../client";
import { Player } from "../types";

const getPlayerById = async (playerId: number) => {
  const response = await playerClient.get<Player>(`/${playerId}`);

  return response.data;
};

export default getPlayerById;
