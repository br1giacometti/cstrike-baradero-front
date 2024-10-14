import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import listScoreReducer, { initialState } from "../reducer/listScoreReducer";
import createTournamentRepository from "../createTournamentRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";

const useAllScoreService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  // No pasamos el token para este servicio
  const repository = useMemo(() => createTournamentRepository(), []);

  const [{ data: scoreList, loading, error }, dispatch] = useReducer(
    listScoreReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  const refetch = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllScore()
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

  return { scoreList, loading, error, refetch };
};

export default useAllScoreService;
