import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { MatchStats } from "../types";

type UpdateMatchStatsPayload = FetchPayload<MatchStats> & {
  CLEAN_ERROR: undefined;
};

export type UpdateMatchStatsActions = BaseAction<UpdateMatchStatsPayload>;

type UpdateMatchStatsAction =
  UpdateMatchStatsActions[keyof UpdateMatchStatsActions];

interface UpdateMatchStatsState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateMatchStatsState = {
  loading: false,
};

const updateMatchStatsReducer = (
  state: UpdateMatchStatsState = initialState,
  action: UpdateMatchStatsAction
): UpdateMatchStatsState => {
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

export default updateMatchStatsReducer;
