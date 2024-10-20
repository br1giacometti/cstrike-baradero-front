import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Tournament } from "../types";

type UpdateTournamentPayload = FetchPayload<Tournament> & {
  CLEAN_ERROR: undefined;
};

export type UpdateTournamentActions = BaseAction<UpdateTournamentPayload>;

type UpdateTournamentAction =
  UpdateTournamentActions[keyof UpdateTournamentActions];

interface UpdateTournamentState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateTournamentState = {
  loading: false,
};

const updateTournamentReducer = (
  state: UpdateTournamentState = initialState,
  action: UpdateTournamentAction
): UpdateTournamentState => {
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

export default updateTournamentReducer;
