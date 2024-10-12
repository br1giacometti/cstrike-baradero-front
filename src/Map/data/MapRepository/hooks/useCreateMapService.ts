import { useEffect, useState } from "react";
import { CreateMapSchema } from "Map/schemas/createMapSchema";
import createMapService from "../services/createMap";

const useCreateMapService = (
  body: CreateMapSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createMapService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateMapService;
