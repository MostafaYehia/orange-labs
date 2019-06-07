import { Injectable } from "@angular/core";
import { AuthApiService } from "../services/auth-api.service";
import { CanActivate, Router } from "@angular/router";
import { AppState } from "../../ngrx-store/reducers";
import { Store } from "@ngrx/store";
import { isLoggedState } from "../selectors";
import { Observable, pipe, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class ChechAuthService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(isLoggedState).pipe(
      map(loggedIn => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      })
    );
  }
}
