import matchClient from "../client";
import { Match } from "../types";

const getMatchById = async (matchId: number) => {
  const response = await matchClient.get<Match>(`/${matchId}`);

  return response.data;
};

export default getMatchById;
