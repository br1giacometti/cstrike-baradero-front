import teamClient from "../client";
import { Team } from "../types";

const getAllTeam = async () => {
  const response = await teamClient.get<Team[]>("/");

  return response.data;
};

export default getAllTeam;
