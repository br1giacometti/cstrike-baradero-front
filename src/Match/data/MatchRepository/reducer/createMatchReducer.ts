import BaseAction from "Base/types/BaseAction";
import FetchPayload from "Base/types/FetchPayload";
import { Match } from "../types";
import FetchActionTypes from "Base/types/FetchActionTypes";

type CreateMatchPayload = FetchPayload<Match> & {
  CLEAN_ERROR: undefined;
};

export type CreateMatchActions = BaseAction<CreateMatchPayload>;

type CreateMatchAction = CreateMatchActions[keyof CreateMatchActions];

interface CreateMatchState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateMatchState = {
  loading: false,
};

const createMatchReducer = (
  state: CreateMatchState = initialState,
  action: CreateMatchAction
): CreateMatchState => {
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

export default createMatchReducer;
