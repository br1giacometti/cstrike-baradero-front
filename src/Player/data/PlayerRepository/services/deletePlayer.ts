import playerClient from "../client";

const deletePerson = async (playerId: number): Promise<boolean> => {
  const response = await playerClient.delete<boolean>(`/${playerId}`);

  return response.data;
};

export default deletePerson;
