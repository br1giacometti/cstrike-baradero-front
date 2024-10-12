import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";

import listTournamentReducer, {
  initialState,
} from "../reducer/listTournamentReducer";
import createTournamentRepository from "../createTournamentRepository";

const useAllTournamentService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  const repository = useMemo(
    () => createTournamentRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: tournamentList, loading, error }, dispatch] = useReducer(
    listTournamentReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  // Nueva función refetch para volver a cargar los tournaments
  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllTournament()
        .then((data) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data });
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
        });
    }
  }, [invalidated, repository]);

  useEffect(() => {
    if (invalidated) {
      setInvalidateCache(false);
    }
  }, [invalidated]);

  return { tournamentList, loading, error, refetch };
};

export default useAllTournamentService;
