import axios from "axios";

const matchClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/match`,
});

// Asegúrate de no tener interceptores que agreguen el token
matchClient.interceptors.request.use(
  (config) => {
    // Verifica si hay lógica que añade headers aquí
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default matchClient;
