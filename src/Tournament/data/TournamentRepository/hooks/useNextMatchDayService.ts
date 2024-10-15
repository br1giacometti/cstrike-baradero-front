import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import listFixtureReducer, {
  initialState,
} from "../reducer/listFixtureReducer";
import createTournamentRepository from "../createTournamentRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import listMatchDayReducer from "../reducer/listNextMatchDayReducer";

const useNextMatchDayService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  // No pasamos el token para este servicio
  const repository = useMemo(() => createTournamentRepository(), []);

  const [{ data: fixtureList, loading, error }, dispatch] = useReducer(
    listMatchDayReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  const refetch = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getNextMatchDay()
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

  return { fixtureList, loading, error, refetch };
};

export default useNextMatchDayService;
