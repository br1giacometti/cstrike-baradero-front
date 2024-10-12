import { GameRepository } from "./types";

import getAllGame from "./services/getAllGame";
import GameClient from "./client";
import getGameById from "./services/getGameById";
import createGame from "./services/createGame";

const createGameRepository = (userToken: string): GameRepository => {
  GameClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createGame,
    getAllGame,
    getGameById,
  };
};

export default createGameRepository;
