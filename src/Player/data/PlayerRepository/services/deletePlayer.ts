import playerClient from "../client";

const deletePlayer = async (playerId: number): Promise<boolean> => {
  const response = await playerClient.delete<boolean>(`/${playerId}`);

  return response.data;
};

export default deletePlayer;
