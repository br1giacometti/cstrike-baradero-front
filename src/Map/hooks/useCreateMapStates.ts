import { useReducer } from "react";

import { Map } from "Map/data/MapRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createMapReducer from "Map/data/MapRepository/reducer/createMapReducer";
import { initialState } from "Map/data/MapRepository/reducer/listMapReducer";

const useCreateMapStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createMapReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Map) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateMapStates;
