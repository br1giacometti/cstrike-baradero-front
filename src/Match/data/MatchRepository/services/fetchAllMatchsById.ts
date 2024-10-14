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
    throw error; // Lanza el error para manejarlo más adelante
  }
};

export default fetchAllMatchsById;
