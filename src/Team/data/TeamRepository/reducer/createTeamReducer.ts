import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Team } from "../types";

type CreateTeamPayload = FetchPayload<Team> & {
  CLEAN_ERROR: undefined;
};

export type CreateTeamActions = BaseAction<CreateTeamPayload>;

type CreateTeamAction = CreateTeamActions[keyof CreateTeamActions];

interface CreateTeamState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateTeamState = {
  loading: false,
};

const createTeamReducer = (
  state: CreateTeamState = initialState,
  action: CreateTeamAction
): CreateTeamState => {
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

export default createTeamReducer;
