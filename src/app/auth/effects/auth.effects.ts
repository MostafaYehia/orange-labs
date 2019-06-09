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
import { NgxNotificationService } from "ngx-notification";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  userDataKey = "o-labs-userData";

  constructor(
    private authApi: AuthApiService,
    private router: Router,
    private ngxNotificationService: NgxNotificationService,
    private secureStorage: LocalStorageService,
    private actions$: Actions<AuthActions>
  ) {}

  // Load user
  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOAD_USER),
    switchMap(() => {
      // Load user
      const loadedUser = this.secureStorage.getItem(this.userDataKey);

      const token = loadedUser ? loadedUser.token : null;

      return this.authApi.checkAuth(token).pipe(
        map(res => {
          // Store new backend user state

          const newData: any = {
            ...loadedUser,
            user: { ...loadedUser.user, isVerified: res.isVerified }
          };

          console.log("Loaded data:", newData)

          this.secureStorage.storeItem(this.userDataKey, newData);
          return new LoginSuccess(newData);
        }),
        catchError(err => {
          return of(new Loggedout());
        })
      );
    })
  );

  // Login
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((action: any) => {
      return this.authApi.login(action.payload).pipe(
        map(res => {
          console.log("Store these data", res);
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

  @Effect({ dispatch: false })
  activationEmail$ = this.actions$.pipe(
    ofType(AuthActionTypes.RESEND_ACTIVATION_EMAIL),
    switchMap((action: any) => {
      const token = this.authApi.token;
      console.log("Send email with this token", token);
      return this.authApi.resendActivation(token).pipe(
        map(res => {
          // Show that you need to verify your account
          this.ngxNotificationService.sendMessage(
            "New email has been sent",
            "success",
            "bottom-right"
          );
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
