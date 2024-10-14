import matchClient from "../client";
import { Match } from "../types";

const getMatchById = async (matchId: number) => {
  // Asegúrate de eliminar cualquier header Authorization
  delete matchClient.defaults.headers.common["Authorization"];

  const response = await matchClient.get<Match>(`/${matchId}`);
  return response.data;
};

export default getMatchById;
