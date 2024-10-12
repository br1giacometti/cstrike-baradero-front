import matchClient from "../client";
import { Match } from "../types";

const fetchAllMatchsById = async (
  matchDayId: number,
  teamId: number
): Promise<Match[]> => {
  try {
    const response = await matchClient.get<Match[]>(
      `/filter/${matchDayId}/${teamId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error; // Opcional: lanza el error para que pueda ser manejado por el llamador
  }
};

export default fetchAllMatchsById;
