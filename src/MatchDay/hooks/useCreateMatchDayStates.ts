import { useReducer } from "react";

import { MatchDay } from "MatchDay/data/MatchDayRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createMatchDayReducer from "MatchDay/data/MatchDayRepository/reducer/createMatchDayReducer";
import { initialState } from "MatchDay/data/MatchDayRepository/reducer/listMatchDayReducer";

const useCreateMatchDayStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createMatchDayReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: MatchDay) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateMatchDayStates;
