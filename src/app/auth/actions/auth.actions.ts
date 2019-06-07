import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  CHECK_AUTH = "[Auth] Check Auth",

  LOAD_USER = "[Auth] Load User",
  LOAD_USER_SUCCESS = "[Auth] Load User Success",
  LOAD_USER_FAILD = "[Auth] Load User Faild",

  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",

  SIGNUP = "[Auth] Signup",
  SIGNUP_SUCCESS = "[Auth] Signup Success",

  LOGOUT = "[Auth] Logout",
  LOGGEDOUT = "[Auth] Loggedout",

  AUTH_LOADING = "[Auth] Loading",
  AUTH_ERROR = "[Auth] Error"
}

/**
 * Check Auth Action
 */
export class CheckAuth implements Action {
  readonly type = AuthActionTypes.CHECK_AUTH;
  constructor() {}
}

/**
 * Load User Action
 */
export class LoadUser implements Action {
  readonly type = AuthActionTypes.LOAD_USER;
  constructor() {}
}

/**
 * Load User Success Action
 */
export class LoadUserSuccess implements Action {
  readonly type = AuthActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * Load User Faild Action
 */
export class LoadUserFaild implements Action {
  readonly type = AuthActionTypes.LOAD_USER_FAILD;
  constructor(public error: any) {}
}

/**
 * Login Action
 */
export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

/**
 * Login Success Action
 */
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * Signup Action
 */
export class Signup implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(
    public payload: { username: string; email: string; password: string }
  ) {}
}

/**
 * Signup Success Action
 */
export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * Logout Action
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

/**
 * Logggedout Action
 */
export class Loggedout implements Action {
  readonly type = AuthActionTypes.LOGGEDOUT;
  constructor() {}
}

/**
 * Authentication Error Action
 */
export class AuthLoading implements Action {
  readonly type = AuthActionTypes.AUTH_LOADING;
  constructor() {}
}

/**
 * Authentication Error Action
 */
export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload: { type: string; message: string }) {}
}

export type AuthActions =
  | CheckAuth
  | LoadUser
  | LoadUserSuccess
  | Login
  | LoginSuccess
  | Signup
  | SignupSuccess
  | Logout
  | Loggedout
  | AuthLoading
  | AuthError;
