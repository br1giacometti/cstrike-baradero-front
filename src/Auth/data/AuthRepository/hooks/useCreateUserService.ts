import { useEffect, useState } from "react";

import createUserService from "../services/createUser";
import { CreateUserSchema } from "Auth/schemas/CreateUserSchema";

const useCreateUserService = (
  body: CreateUserSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createUserService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateUserService;
