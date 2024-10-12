import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";

import listTeamReducer, { initialState } from "../reducer/listTeamReducer";
import createTeamRepository from "../createTeamRepository";

const useAllTeamService = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>(
    undefined
  );

  const repository = useMemo(
    () => createTeamRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: teamList, loading, error }, dispatch] = useReducer(
    listTeamReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  // Nueva función refetch para volver a cargar los teams
  const refetch = useCallback(() => {
    setInvalidateCache(true);
  }, []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllTeam()
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

  return { teamList, loading, error, refetch };
};

export default useAllTeamService;
