import { isAxiosError } from "axios";
import matchClient from "../client";
import { CreateMatchSchema } from "Match/schemas/createMatchSchema";

const createMatch = async (body: CreateMatchSchema) => {
  console.log("Creando Match Day con el cuerpo:", body);
  try {
    const response = await matchClient.post("/create", body);
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error en la creación:", error.response?.data.message);
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createMatch;
