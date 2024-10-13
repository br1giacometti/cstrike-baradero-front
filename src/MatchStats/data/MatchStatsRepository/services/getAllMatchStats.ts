import matchstatsClient from "../client";
import { MatchStats } from "../types";

const getAllMatchStats = async () => {
  const response = await matchstatsClient.get<MatchStats[]>("/");

  return response.data;
};

export default getAllMatchStats;
