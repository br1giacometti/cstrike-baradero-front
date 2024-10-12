import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Game } from "../types";

type CreateGamePayload = FetchPayload<Game> & {
  CLEAN_ERROR: undefined;
};

export type CreateGameActions = BaseAction<CreateGamePayload>;

type CreateGameAction = CreateGameActions[keyof CreateGameActions];

interface CreateGameState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateGameState = {
  loading: false,
};

const createGameReducer = (
  state: CreateGameState = initialState,
  action: CreateGameAction
): CreateGameState => {
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
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "CLEAN_ERROR": {
      return {
        ...state,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default createGameReducer;
