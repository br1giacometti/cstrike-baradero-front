import matchstatsClient from "../client";
import { MatchStats } from "../types";

const getTop10MatchStats = async () => {
  const response = await matchstatsClient.get<MatchStats[]>("/top10");

  return response.data;
};

export default getTop10MatchStats;
