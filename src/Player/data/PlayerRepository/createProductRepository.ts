import { PlayerRepository } from "./types";
import createPlayer from "./services/createPlayer";
import getAllPlayer from "./services/getAllPlayer";
import playerClient from "./client";
import updatePlayer from "./services/updatePlayer";
import deletePlayer from "./services/deletePlayer";
import getPlayerById from "./services/getPlayerById";
import getAllPlayerPaginated from "./services/getAllPlayerPaginated";

const createPlayerRepository = (userToken: string): PlayerRepository => {
  playerClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createPlayer,
    getAllPlayer,
    getAllPlayerPaginated,
    deletePlayer,
    getPlayerById,
    updatePlayer,
  };
};

export default createPlayerRepository;
