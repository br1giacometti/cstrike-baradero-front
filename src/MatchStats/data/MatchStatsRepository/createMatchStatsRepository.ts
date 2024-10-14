import createMatchStats from "./services/createMatchStats";
import getAllMatchStats from "./services/getAllMatchStats";
import updateMatchStats from "./services/updateMatchStats";
import deleteMatchStats from "./services/deleteMatchStats";
import getMatchStatsById from "./services/getMatchStatsById";
import matchStatsClient from "./client";
import { MatchStatsRepository } from "./types";
import getTop10MatchStats from "./services/getTop10MatchStats";

const createMatchStatsRepository = (
  userToken?: string
): MatchStatsRepository => {
  if (userToken) {
    matchStatsClient.defaults.headers.common = {
      Authorization: `Bearer ${userToken}`,
    };
  }

  return {
    createMatchStats,
    getAllMatchStats: () => getAllMatchStats(),
    getTop10MatchStats: () => getTop10MatchStats(),
    deleteMatchStats,
    getMatchStatsById,
    updateMatchStats,
  };
};

export default createMatchStatsRepository;
