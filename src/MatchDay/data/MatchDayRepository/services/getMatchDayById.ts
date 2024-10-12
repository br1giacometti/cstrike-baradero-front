import matchDayClient from "../client";
import { MatchDay } from "../types";

const getMatchDayById = async (matchdayId: number) => {
  const response = await matchDayClient.get<MatchDay>(`/${matchdayId}`);

  return response.data;
};

export default getMatchDayById;
