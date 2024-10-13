import createMatchStats from "./services/createMatchStats";
import getAllMatchStats from "./services/getAllMatchStats";
import updateMatchStats from "./services/updateMatchStats";
import deleteMatchStats from "./services/deleteMatchStats";
import getMatchStatsById from "./services/getMatchStatsById";
import matchStatsClient from "./client";
import { MatchStatsRepository } from "./types";

const createMatchStatsRepository = (
  userToken: string
): MatchStatsRepository => {
  matchStatsClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createMatchStats,
    getAllMatchStats,
    deleteMatchStats,
    getMatchStatsById,
    updateMatchStats,
  };
};

export default createMatchStatsRepository;
