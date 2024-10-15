import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Tournament } from "../types";

type UpdateTournamentStagePayload = FetchPayload<Tournament> & {
  CLEAN_ERROR: undefined;
};

export type UpdateTournamentStageActions =
  BaseAction<UpdateTournamentStagePayload>;

type UpdateTournamentStageAction =
  UpdateTournamentStageActions[keyof UpdateTournamentStageActions];

interface UpdateTournamentStageState {
  loading: boolean;
  error?: string;
}

export const initialState: UpdateTournamentStageState = {
  loading: false,
};

const updateTournamentStageReducer = (
  state: UpdateTournamentStageState = initialState,
  action: UpdateTournamentStageAction
): UpdateTournamentStageState => {
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

export default updateTournamentStageReducer;
