import { useEffect, useState } from "react";
import createPlayerRepository from "../createProductRepository";
import createPlayerService from "../services/createPlayer";
import { CreatePlayerSchema } from "Player/schemas/createPlayerSchema";

const useCreatePlayerService = (
  body: CreatePlayerSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createPlayerService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreatePlayerService;
