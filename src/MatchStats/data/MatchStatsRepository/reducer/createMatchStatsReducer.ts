import BaseAction from "Base/types/BaseAction";
import FetchPayload from "Base/types/FetchPayload";
import { MatchStats } from "../types";
import FetchActionTypes from "Base/types/FetchActionTypes";

type CreateMatchStatsPayload = FetchPayload<MatchStats> & {
  CLEAN_ERROR: undefined;
};

export type CreateMatchStatsActions = BaseAction<CreateMatchStatsPayload>;

type CreateMatchStatsAction =
  CreateMatchStatsActions[keyof CreateMatchStatsActions];

interface CreateMatchStatsState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateMatchStatsState = {
  loading: false,
};

const createMatchStatsReducer = (
  state: CreateMatchStatsState = initialState,
  action: CreateMatchStatsAction
): CreateMatchStatsState => {
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

export default createMatchStatsReducer;
