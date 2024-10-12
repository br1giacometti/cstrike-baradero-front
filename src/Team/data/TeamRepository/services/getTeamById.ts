import teamClient from "../client";
import { Team } from "../types";

const getTeamById = async (teamId: number) => {
  const response = await teamClient.get<Team>(`/${teamId}`);

  return response.data;
};

export default getTeamById;
