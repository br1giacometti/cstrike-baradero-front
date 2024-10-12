import tournamentClient from "../client";

const deletePerson = async (tournamentId: number): Promise<boolean> => {
  const response = await tournamentClient.delete<boolean>(`/${tournamentId}`);

  return response.data;
};

export default deletePerson;
