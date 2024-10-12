import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Match } from "../types";

type UpdateMatchPayload = FetchPayload<Match> & {
  CLEAN_ERROR: undefined;
};

export type UpdateMatchActions = BaseAction<UpdateMatchPayload>;

type UpdateMatchAction = UpdateMatchActions[keyof UpdateMatchActions];

interface UpdateMatchState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateMatchState = {
  loading: false,
};

const updateMatchReducer = (
  state: UpdateMatchState = initialState,
  action: UpdateMatchAction
): UpdateMatchState => {
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

export default updateMatchReducer;
