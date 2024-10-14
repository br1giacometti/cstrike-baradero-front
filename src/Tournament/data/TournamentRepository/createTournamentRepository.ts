import { TournamentRepository } from "./types";
import createTournament from "./services/createTournament";
import getAllTournament from "./services/getAllTournament";
import tournamentClient from "./client";
import updateTournament from "./services/updateTournament";
import deleteTournament from "./services/deleteTournament";
import getTournamentById from "./services/getTournamentById";
import getAllFixture from "./services/getAllFixture";
import getAllScore from "./services/getScoreFixture";

// Repositorio que permite crear uno con o sin token
const createTournamentRepository = (
  userToken?: string
): TournamentRepository => {
  if (userToken) {
    tournamentClient.defaults.headers.common = {
      Authorization: `Bearer ${userToken}`,
    };
  }

  return {
    createTournament,
    getAllTournament,
    getAllFixture: () => getAllFixture(),
    getAllScore: () => getAllScore(),
    deleteTournament,
    getTournamentById,
    updateTournament,
  };
};

export default createTournamentRepository;
