import { isAxiosError } from "axios";
import { CreateMapSchema } from "Map/schemas/createMapSchema";
import MapClient from "../client";

const createMap = async (body: CreateMapSchema) => {
  try {
    const response = await MapClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createMap;
