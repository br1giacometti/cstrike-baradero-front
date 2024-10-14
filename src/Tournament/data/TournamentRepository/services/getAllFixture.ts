import tournamentClient from "../client";
import { Fixture, Tournament } from "../types";

const getAllFixture = async () => {
  const response = await tournamentClient.get<Fixture[]>("/fixture");

  return response.data;
};

export default getAllFixture;
