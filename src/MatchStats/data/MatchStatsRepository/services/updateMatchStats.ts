import { UpdateMatchStatsSchema } from "MatchStats/schemas/UpdateMatchStatsSchema";
import peopleClient from "../client";
import { MatchStats } from "../types";

const updateMatchStats = async (
  body: UpdateMatchStatsSchema,
  matchstatsId: number
): Promise<MatchStats> => {
  const response = await peopleClient.patch<MatchStats>(
    `/${matchstatsId}`,
    body
  );

  return response.data;
};

export default updateMatchStats;
