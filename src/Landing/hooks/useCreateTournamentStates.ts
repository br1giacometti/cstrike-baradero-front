import { useReducer } from "react";

import { Tournament } from "Tournament/data/TournamentRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createTournamentReducer from "Tournament/data/TournamentRepository/reducer/createTournamentReducer";
import { initialState } from "Tournament/data/TournamentRepository/reducer/listTournamentReducer";

const useCreateTournamentStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createTournamentReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Tournament) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateTournamentStates;
