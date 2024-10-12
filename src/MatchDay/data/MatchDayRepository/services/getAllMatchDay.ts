import matchDayClient from "../client";
import { MatchDay } from "../types";

const getAllMatchDay = async () => {
  const response = await matchDayClient.get<MatchDay[]>("/");

  return response.data;
};

export default getAllMatchDay;
