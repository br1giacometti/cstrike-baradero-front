import matchstatsClient from "../client";
import { MatchStats } from "../types";

const getMatchStatsById = async (matchstatsId: number) => {
  const response = await matchstatsClient.get<MatchStats>(`/${matchstatsId}`);

  return response.data;
};

export default getMatchStatsById;
