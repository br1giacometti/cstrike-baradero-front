import { useReducer } from "react";

import { Game } from "Game/data/GameRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createGameReducer from "Game/data/GameRepository/reducer/createGameReducer";
import { initialState } from "Game/data/GameRepository/reducer/listGameReducer";

const useCreateGameStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createGameReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Game) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateGameStates;
