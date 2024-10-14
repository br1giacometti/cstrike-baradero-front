import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";

import listPlayerReducer, { initialState } from "../reducer/listPlayerReducer";
import createPlayerRepository from "../createProductRepository";

const useAllPlayerNoTeamService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  const repository = useMemo(
    () => createPlayerRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: playerList, loading, error }, dispatch] = useReducer(
    listPlayerReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  // Nueva función refetch para volver a cargar los players
  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllPlayerNoTeam()
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

  return { playerList, loading, error, refetch };
};

export default useAllPlayerNoTeamService;
