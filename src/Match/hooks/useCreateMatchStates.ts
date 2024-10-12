import { useReducer } from "react";

import { Match } from "Match/data/MatchRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createMatchReducer from "Match/data/MatchRepository/reducer/createMatchReducer";
import { initialState } from "Match/data/MatchRepository/reducer/listMatchReducer";

const useCreateMatchStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createMatchReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Match) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateMatchStates;
