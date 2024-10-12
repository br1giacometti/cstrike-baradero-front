import { isAxiosError } from "axios";
import { CreateLocationSchema } from "Location/schemas/createLocationSchema";
import LocationClient from "../client";

const createLocation = async (body: CreateLocationSchema) => {
  try {
    const response = await LocationClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createLocation;
