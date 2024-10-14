import playerClient from "../client";

const disconnectPlayer = async (playerId: number): Promise<boolean> => {
  const response = await playerClient.patch<boolean>(`/disconnect/${playerId}`);

  return response.data;
};

export default disconnectPlayer;
