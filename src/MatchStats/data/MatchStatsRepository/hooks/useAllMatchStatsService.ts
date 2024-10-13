import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";

import createMatchStatsRepository from "../createMatchStatsRepository";
import listMatchStatsReducer, {
  initialState,
} from "../reducer/listMatchStatsReducer";

const useAllMatchStatsService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  const repository = useMemo(
    () => createMatchStatsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: matchstatsList, loading, error }, dispatch] = useReducer(
    listMatchStatsReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  // Nueva función refetch para volver a cargar los matchstatss
  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllMatchStats()
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

  return { matchstatsList, loading, error, refetch };
};

export default useAllMatchStatsService;
