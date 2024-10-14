import playerClient from "../client";

const connectPlayer = async (
  playerId: number,
  teamId: number
): Promise<boolean> => {
  const response = await playerClient.patch<boolean>(
    `/connect/${playerId}/${teamId}`
  );

  return response.data;
};

export default connectPlayer;
