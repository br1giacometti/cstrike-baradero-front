import createMatch from "./services/createMatch";
import getAllMatch from "./services/getAllMatch";
import updateMatch from "./services/updateMatch";
import deleteMatch from "./services/deleteMatch";
import fetchAllMatchsById from "./services/fetchAllMatchsById";
import getMatchById from "./services/getMatchById";
import matchClient from "./client";
import { MatchRepository } from "./types";

const createMatchRepository = (userToken: string): MatchRepository => {
  matchClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createMatch: createMatch,
    fetchAllMatchsById,
    getAllMatch,
    deleteMatch,
    getMatchById,
    updateMatch,
  };
};

export default createMatchRepository;
