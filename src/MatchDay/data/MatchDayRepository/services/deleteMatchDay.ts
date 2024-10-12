import matchDayClient from "../client";

const deletePerson = async (matchdayId: number): Promise<boolean> => {
  const response = await matchDayClient.delete<boolean>(`/${matchdayId}`);

  return response.data;
};

export default deletePerson;
