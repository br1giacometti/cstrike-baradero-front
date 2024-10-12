import { UpdatePlayerSchema } from "Player/schemas/UpdatePlayerSchema";
import peopleClient from "../client";
import { Player } from "../types";

const updatePlayer = async (
  body: UpdatePlayerSchema,
  playerId: number
): Promise<Player> => {
  const response = await peopleClient.patch<Player>(`/${playerId}`, body);

  return response.data;
};

export default updatePlayer;
