import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { HttpClient }from '@angular/common/http';

class LoggedIn {
  readonly type = "[Auth] LoggedIn"
  constructor(public payload: any){}
}

@Injectable({ providedIn: 'root' })
export class AuthEffects {


  constructor(private http: HttpClient, private actions$: Actions<AuthActions>) { }


  // Check Auth
  @Effect()
  checkAuth$ = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_AUTH),
    switchMap((action => {

      return this.http.get('...').pipe(map( res => {
          return new LoggedIn({ userData: res})
      }))
    }))
  );

  // Load user
  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOAD_USER),
    concatMap(() => EMPTY)
  );


  // Login
  @Effect()
  Login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    concatMap(() => EMPTY)
  );


  // Logout
  @Effect()
  Logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    concatMap(() => EMPTY)
  );




}
