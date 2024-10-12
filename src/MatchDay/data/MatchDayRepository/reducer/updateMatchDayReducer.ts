import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { MatchDay } from "../types";

type UpdateMatchDayPayload = FetchPayload<MatchDay> & {
  CLEAN_ERROR: undefined;
};

export type UpdateMatchDayActions = BaseAction<UpdateMatchDayPayload>;

type UpdateMatchDayAction = UpdateMatchDayActions[keyof UpdateMatchDayActions];

interface UpdateMatchDayState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateMatchDayState = {
  loading: false,
};

const updateMatchDayReducer = (
  state: UpdateMatchDayState = initialState,
  action: UpdateMatchDayAction
): UpdateMatchDayState => {
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

export default updateMatchDayReducer;
