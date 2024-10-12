import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Game } from "../types";

type ListGamePayload = FetchPayload<Game[]>;

export type ListGameActions = BaseAction<ListGamePayload>;

type ListGameAction = ListGameActions[keyof ListGameActions];

interface ListGameState {
  data: Game[];
  loading: boolean;
  error?: string;
}

export const initialState: ListGameState = {
  data: [],
  loading: false,
};

const listGameReducer = (
  state: ListGameState = initialState,
  action: ListGameAction
): ListGameState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return {
        ...state,
        loading: true,
      };
    }
    case FetchActionTypes.Succeess: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        data: initialState.data,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default listGameReducer;
