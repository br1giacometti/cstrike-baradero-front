import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Player } from "../types";

type CreatePlayerPayload = FetchPayload<Player> & {
  CLEAN_ERROR: undefined;
};

export type CreatePlayerActions = BaseAction<CreatePlayerPayload>;

type CreatePlayerAction = CreatePlayerActions[keyof CreatePlayerActions];

interface CreatePlayerState {
  loading: boolean;
  error?: string;
}

export const initialState: CreatePlayerState = {
  loading: false,
};

const createPlayerReducer = (
  state: CreatePlayerState = initialState,
  action: CreatePlayerAction
): CreatePlayerState => {
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

export default createPlayerReducer;
