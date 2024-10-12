import { useEffect, useState } from "react";
import createTournamentRepository from "../createTournamentRepository";
import createTournamentService from "../services/createTournament";
import { CreateTournamentSchema } from "Tournament/schemas/createTournamentSchema";

const useCreateTournamentService = (
  body: CreateTournamentSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createTournamentService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateTournamentService;
