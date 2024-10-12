import teamClient from "../client";

const deletePerson = async (teamId: number): Promise<boolean> => {
  const response = await teamClient.delete<boolean>(`/${teamId}`);

  return response.data;
};

export default deletePerson;
