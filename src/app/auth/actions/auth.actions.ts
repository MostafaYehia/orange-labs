import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  CHECK_AUTH = '[Auth] Check Auth',

  LOAD_USER = '[Auth] Load User',
  LOAD_USER_SUCCESS = '[Auth] Load User Success',
  LOAD_USER_FAILD = '[Auth] Load User Faild',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILD = '[Auth] Login Faild',

  LOGOUT = '[Auth] Logout',
  LOGGEDOUT = '[Auth] Loggedout'

}

/**
 * Check Auth Action
 */
export class CheckAuth implements Action {
  readonly type = AuthActionTypes.CHECK_AUTH;
  constructor() { }
}

/**
 * Load User Action
 */
export class LoadUser implements Action {
  readonly type = AuthActionTypes.LOAD_USER;
  constructor() { }
}

/**
 * Load User Success Action
 */
export class LoadUserSuccess implements Action {
  readonly type = AuthActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: any) { }
}

/**
 * Load User Faild Action
 */
export class LoadUserFaild implements Action {
  readonly type = AuthActionTypes.LOAD_USER_FAILD;
  constructor(public error: any) { }
}


/**
 * Login Action
 */
export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor() { }
}

/**
 * Login Faild Action
 */
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

/**
 * Login Faild Action
 */
export class LoginFaild implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILD;
  constructor(public error: any) { }
}


/**
 * Logout Action
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() { }
}

/**
 * Logggedout Action
 */
export class Loggedout implements Action {
  readonly type = AuthActionTypes.LOGGEDOUT;
  constructor() { }
}


export type AuthActions =
  | CheckAuth

  | LoadUser
  | LoadUserSuccess
  | LoadUserFaild

  | Login
  | LoginSuccess
  | LoginFaild

  | Logout
  | Loggedout
