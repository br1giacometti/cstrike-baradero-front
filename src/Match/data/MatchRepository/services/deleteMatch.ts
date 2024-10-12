import matchClient from "../client";

const deletePerson = async (matchId: number): Promise<boolean> => {
  const response = await matchClient.delete<boolean>(`/${matchId}`);

  return response.data;
};

export default deletePerson;
