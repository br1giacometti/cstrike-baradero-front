import BaseAction from "Base/types/BaseAction";
import FetchPayload from "Base/types/FetchPayload";
import { MatchDay } from "../types";
import FetchActionTypes from "Base/types/FetchActionTypes";

type CreateMatchDayPayload = FetchPayload<MatchDay> & {
  CLEAN_ERROR: undefined;
};

export type CreateMatchDayActions = BaseAction<CreateMatchDayPayload>;

type CreateMatchDayAction = CreateMatchDayActions[keyof CreateMatchDayActions];

interface CreateMatchDayState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateMatchDayState = {
  loading: false,
};

const createMatchDayReducer = (
  state: CreateMatchDayState = initialState,
  action: CreateMatchDayAction
): CreateMatchDayState => {
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

export default createMatchDayReducer;
