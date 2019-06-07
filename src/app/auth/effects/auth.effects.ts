import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { EMPTY, of, Observable } from "rxjs";
import {
  AuthActionTypes,
  AuthActions,
  AuthError,
  LoginSuccess,
  SignupSuccess,
  Loggedout
} from "../actions/auth.actions";
import { AuthApiService } from "../services/auth-api.service";
import { LocalStorageService } from "../services/localStorage.service";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  userDataKey = "o-labs-userData";

  constructor(
    private authApi: AuthApiService,
    private router: Router,
    private secureStorage: LocalStorageService,
    private actions$: Actions<AuthActions>
  ) {}

  // Check Auth
  // @Effect()
  // checkAuth$ = this.actions$.pipe(
  //   ofType(AuthActionTypes.CHECK_AUTH),
  //   switchMap((action: any) => {
  //     return this.authApi.login(action.payload).pipe(
  //       map(res => {
  //         return new LoggedIn({ userData: res });
  //       })
  //     );
  //   })
  // );

  // Load user
  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOAD_USER),
    switchMap(() => {
      // Load user
      const user = this.secureStorage.getItem(this.userDataKey);
      if (user) {
        this.router.navigate(["/"]);
        return of(new LoginSuccess(user));
      } else {
        return of({ type: "error" });
      }
    })
  );

  // Login
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((action: any) => {
      return this.authApi.login(action.payload).pipe(
        map(res => {
          this.secureStorage.storeItem(this.userDataKey, res);
          this.router.navigate(["/main"]);
          return new LoginSuccess(res);
        }),
        catchError(err => {
          return of(
            new AuthError({ type: "login", message: err.error.message })
          );
        })
      );
    })
  );

  @Effect()
  signup$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP),
    switchMap((action: any) => {
      return this.authApi.signup(action.payload).pipe(
        map(res => {
          // Show that you need to verify your account
          this.secureStorage.storeItem(this.userDataKey, res);
          return new SignupSuccess(res);
        }),
        catchError(err => {
          return of(
            new AuthError({ type: "signup", message: err.error.message })
          );
        })
      );
    })
  );

  // Logout
  @Effect()
  Logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    map(res => {
      // Show that you need to verify your account
      this.secureStorage.removeItem(this.userDataKey);
      this.router.navigate(["/landing"]);
      return new Loggedout();
    })
  );
}
