import { useEffect, useState } from "react";

import { CreateMatchSchema } from "Match/schemas/createMatchSchema";
import createMatch from "../services/createMatch";

const useCreateMatchService = (
  body: CreateMatchSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createMatch(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateMatchService;
