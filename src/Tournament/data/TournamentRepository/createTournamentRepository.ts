import { TournamentRepository } from "./types";
import createTournament from "./services/createTournament";
import getAllTournament from "./services/getAllTournament";
import tournamentClient from "./client";
import updateTournament from "./services/updateTournament";
import deleteTournament from "./services/deleteTournament";
import getTournamentById from "./services/getTournamentById";

const createTournamentRepository = (
  userToken: string
): TournamentRepository => {
  tournamentClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createTournament,
    getAllTournament,
    deleteTournament,
    getTournamentById,
    updateTournament,
  };
};

export default createTournamentRepository;
