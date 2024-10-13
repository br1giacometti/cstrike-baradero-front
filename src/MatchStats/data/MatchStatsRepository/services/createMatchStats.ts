import { isAxiosError } from "axios";
import matchstatsClient from "../client";
import { CreateMatchStatsSchema } from "MatchStats/schemas/createMatchStatsSchema";

const createMatchStats = async (body: CreateMatchStatsSchema) => {
  console.log("Creando MatchStats con el cuerpo:", body);

  try {
    const token = localStorage.getItem("userToken"); // Obtener el token
    console.log(token);

    const response = await matchstatsClient.post("/create", body, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token aquí
      },
    });

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

export default createMatchStats;
