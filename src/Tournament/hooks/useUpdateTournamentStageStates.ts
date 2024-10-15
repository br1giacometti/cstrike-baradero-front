import FetchActionTypes from "Base/types/FetchActionTypes";
import { Tournament } from "Tournament/data/TournamentRepository";
import updateTournamentStageReducer, {
  initialState,
} from "Tournament/data/TournamentRepository/reducer/updateTournamentStageReducer";

import { useReducer } from "react";

const useUpdateTournamentStageStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateTournamentStageReducer,
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

export default useUpdateTournamentStageStates;
