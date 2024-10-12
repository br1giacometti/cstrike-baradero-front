import { useEffect, useState } from "react";

import createTeamService from "../services/createTeam";
import { CreateTeamSchema } from "Team/schemas/createTeamSchema";

const useCreateTeamService = (
  body: CreateTeamSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createTeamService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateTeamService;
