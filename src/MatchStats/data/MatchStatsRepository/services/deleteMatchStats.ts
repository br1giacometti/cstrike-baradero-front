import matchstatsClient from "../client";

const deletePerson = async (matchstatsId: number): Promise<boolean> => {
  const response = await matchstatsClient.delete<boolean>(`/${matchstatsId}`);

  return response.data;
};

export default deletePerson;
