import { AuthActions, AuthActionTypes } from "../actions/auth.actions";
import { ActionReducer } from "@ngrx/store";

export interface AuthState {
  user: {
    token: string | null;
    data: object | null;
  };
  loading: boolean;
  error: {
    login: string | null;
    signup: string | null;
  };
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: {
    login: null,
    signup: null
  }
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: {
          token: action.payload.token,
          data: action.payload.user
        }
      };

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: { ...state.error, login: null },
        user: {
          token: action.payload.token,
          data: action.payload.user
        }
      };
    }

    case AuthActionTypes.SIGNUP_SUCCESS: {
      console.log("@Reducer: Signup user", action.payload);

      return {
        ...state,
        loading: false,
        error: { ...state.error, signup: null },
        user: {
          token: action.payload.token,
          data: action.payload.user
        }
      };
    }

    case AuthActionTypes.AUTH_LOADING:
      return { ...state, loading: true, error: { signup: null, login: null } };

    case AuthActionTypes.AUTH_ERROR: {
      const error = { ...state.error };
      error[action.payload.type] = action.payload.message;
      return { ...state, loading: false, error };
    }

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };

    default:
      return state;
  }
}
