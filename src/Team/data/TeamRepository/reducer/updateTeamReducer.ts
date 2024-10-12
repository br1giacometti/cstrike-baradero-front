import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Team } from "../types";

type UpdateTeamPayload = FetchPayload<Team> & {
  CLEAN_ERROR: undefined;
};

export type UpdateTeamActions = BaseAction<UpdateTeamPayload>;

type UpdateTeamAction = UpdateTeamActions[keyof UpdateTeamActions];

interface UpdateTeamState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateTeamState = {
  loading: false,
};

const updateTeamReducer = (
  state: UpdateTeamState = initialState,
  action: UpdateTeamAction
): UpdateTeamState => {
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

export default updateTeamReducer;
