import { useEffect, useState } from "react";

import { CreateMatchDaySchema } from "MatchDay/schemas/createMatchDaySchema";
import createMatchDay from "../services/createMatchDay";

const useCreateMatchDayService = (
  body: CreateMatchDaySchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createMatchDay(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateMatchDayService;
