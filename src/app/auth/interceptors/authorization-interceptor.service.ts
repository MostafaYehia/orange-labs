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
import { AppState } from 'src/app/ngrx-store/reducers';
import { Store } from '@ngrx/store';
import { Logout } from '../actions/auth.actions';

@Injectable({
  providedIn: "root"
})
export class AuthorizationInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private api: ApiService, private store: Store<AppState>) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      console.log("From interceptor", err.message)
      this.store.dispatch(new Logout())
      //navigate /delete cookies or whatever
      this.router.navigate(["/login"]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    return Observable.throw(err);
  }
  token;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `bearer ${this.api.token}`)
    });
    // catch the error
    return next
      .handle(authReq)
      .pipe(catchError(err => this.handleAuthError(err))); 
  }
}
