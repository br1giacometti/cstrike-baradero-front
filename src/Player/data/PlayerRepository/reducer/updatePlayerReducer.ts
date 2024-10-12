import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Player } from "../types";

type UpdatePlayerPayload = FetchPayload<Player> & {
  CLEAN_ERROR: undefined;
};

export type UpdatePlayerActions = BaseAction<UpdatePlayerPayload>;

type UpdatePlayerAction = UpdatePlayerActions[keyof UpdatePlayerActions];

interface UpdatePlayerState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdatePlayerState = {
  loading: false,
};

const updatePlayerReducer = (
  state: UpdatePlayerState = initialState,
  action: UpdatePlayerAction
): UpdatePlayerState => {
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

export default updatePlayerReducer;
