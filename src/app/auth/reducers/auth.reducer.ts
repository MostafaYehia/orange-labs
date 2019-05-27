
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { ActionReducer } from '@ngrx/store';

export interface AuthState {
  user: any | null,
  loading: false
}

export const initialState: AuthState = {
  user: null,
  loading: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LOAD_USER_SUCCESS:
      return {...state, loading: false};

    case AuthActionTypes.LOAD_USER_FAILD:
      return {...state, loading: false};;

    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, loading: false};;

    case AuthActionTypes.LOGIN_FAILD:
      return {...state, loading: false};;

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


