import createMatch from "./services/createMatch";
import getAllMatch from "./services/getAllMatch";
import updateMatch from "./services/updateMatch";
import deleteMatch from "./services/deleteMatch";
import fetchAllMatchsById from "./services/fetchAllMatchsById";
import getMatchById from "./services/getMatchById";
import matchClient from "./client";
import { MatchRepository } from "./types";

const createMatchRepository = (): MatchRepository => {
  // No se necesita manejar el token aquí
  delete matchClient.defaults.headers.common["Authorization"]; // Asegúrate de que no haya cabeceras persistentes

  return {
    createMatch,
    fetchAllMatchsById,
    getAllMatch,
    deleteMatch,
    getMatchById,
    updateMatch,
  };
};

export default createMatchRepository;
