import matchClient from "../client";
import { Match } from "../types";

const getAllMatch = async () => {
  const response = await matchClient.get<Match[]>("/");

  return response.data;
};

export default getAllMatch;
