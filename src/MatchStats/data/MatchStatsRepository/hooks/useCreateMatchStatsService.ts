import { useEffect, useState } from "react";

import { CreateMatchStatsSchema } from "MatchStats/schemas/createMatchStatsSchema";
import createMatchStats from "../services/createMatchStats";

const useCreateMatchStatsService = (
  body: CreateMatchStatsSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createMatchStats(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateMatchStatsService;
