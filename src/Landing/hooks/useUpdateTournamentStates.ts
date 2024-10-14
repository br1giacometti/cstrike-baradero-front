import FetchActionTypes from "Base/types/FetchActionTypes";
import { Tournament } from "Tournament/data/TournamentRepository";
import updateTournamentReducer, {
  initialState,
} from "Tournament/data/TournamentRepository/reducer/updateTournamentReducer";
import { useReducer } from "react";

const useUpdateTournamentStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    updateTournamentReducer,
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

export default useUpdateTournamentStates;
