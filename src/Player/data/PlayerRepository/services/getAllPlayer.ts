import playerClient from "../client";
import { Player } from "../types";

const getAllPlayer = async () => {
  const response = await playerClient.get<Player[]>("/");

  return response.data;
};

export default getAllPlayer;
