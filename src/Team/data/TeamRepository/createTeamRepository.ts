import { TeamRepository } from "./types";
import createTeam from "./services/createTeam";
import getAllTeam from "./services/getAllTeam";
import teamClient from "./client";
import updateTeam from "./services/updateTeam";
import deleteTeam from "./services/deleteTeam";
import getTeamById from "./services/getTeamById";

const createTeamRepository = (userToken: string): TeamRepository => {
  teamClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createTeam,
    getAllTeam,
    deleteTeam,
    getTeamById,
    updateTeam,
  };
};

export default createTeamRepository;
