import peopleClient from "../client";
import { PlayerPaginatedReturn } from "../types";

const useAllPlayerPaginated = async (
  page = 1,
  limit = 100,
  query?: string,
  teamId?: string
): Promise<PlayerPaginatedReturn> => {
  const response = await peopleClient.get<PlayerPaginatedReturn>(
    `/pagination?page=${page}&limit=${limit}${query ? `&query=${query}` : ""}${
      teamId ? `&categoryId=${teamId}` : ""
    }`
  );

  return response.data;
};

export default useAllPlayerPaginated;
