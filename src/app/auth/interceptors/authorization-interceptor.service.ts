import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { ApiService } from "../../core/services/api.service";
import { catchError } from "rxjs/operators";
import { AppState } from "src/app/ngrx-store/reducers";
import { Store } from "@ngrx/store";
import { Logout } from "../actions/auth.actions";

@Injectable()
export class AuthorizationInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private api: ApiService,
    private store: Store<AppState>
  ) {
    console.log("Interceptor has been created and running");
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      this.store.dispatch(new Logout());
      this.router.navigate(["/login"]);
      return of(err.message);
    }
    return Observable.throw(err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req.clone({
      setHeaders: {
        Authorization: `bearer ${this.api.token}`
      }
    });
    // catch the error
    return next
      .handle(authReq)
      .pipe(catchError(err => this.handleAuthError(err)));
  }
}
