import { useEffect, useState } from "react";
import { CreateLocationSchema } from "Location/schemas/createLocationSchema";
import createLocationService from "../services/createLocation";

const useCreateLocationService = (
  body: CreateLocationSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createLocationService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateLocationService;
