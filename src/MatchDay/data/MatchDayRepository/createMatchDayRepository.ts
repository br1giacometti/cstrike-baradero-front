import { MatchDayRepository } from "./types";
import createMatchDay from "./services/createMatchDay";
import getAllMatchDay from "./services/getAllMatchDay";
import updateMatchDay from "./services/updateMatchDay";
import deleteMatchDay from "./services/deleteMatchDay";
import getMatchDayById from "./services/getMatchDayById";
import matchDayClient from "./client";

const createMatchDayRepository = (userToken: string): MatchDayRepository => {
  matchDayClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createMatchDay,
    getAllMatchDay,
    deleteMatchDay,
    getMatchDayById,
    updateMatchDay,
  };
};

export default createMatchDayRepository;
