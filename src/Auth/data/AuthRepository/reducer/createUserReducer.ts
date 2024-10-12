import { User } from "Auth/types";
import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

type CreateUserPayload = FetchPayload<User> & {
  CLEAN_ERROR: undefined;
};

export type CreateUserActions = BaseAction<CreateUserPayload>;

type CreateUserAction = CreateUserActions[keyof CreateUserActions];

interface CreateUserState {
  loading: boolean;
  error?: string;
}

export const initialState: CreateUserState = {
  loading: false,
};

const createUserReducer = (
  state: CreateUserState = initialState,
  action: CreateUserAction
): CreateUserState => {
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

export default createUserReducer;
