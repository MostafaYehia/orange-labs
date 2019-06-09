import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../../core/services/api.service";
import { tap } from "rxjs/operators";
import { AppState } from 'src/app/ngrx-store/reducers';
import { Store } from '@ngrx/store';
import { tokenState } from '../selectors';

@Injectable({
  providedIn: "root"
})
export class AuthApiService implements OnDestroy {
 
  token = '';
  subs: Subscription[] = [];
  constructor(private http: HttpClient, private api: ApiService, private store: Store<AppState>) {
    this.store.select(tokenState).subscribe(token => this.token = token)
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(this.api.urls.login, data);
  }

  signup(data: { email: string; password: string }): Observable<any> {
    return this.http.post(this.api.urls.signup, data);
  }

  checkAuth(token: string): Observable<any> {
    return this.http.get(`${this.api.urls.checkAuth}?token=${token}`);
  }

  resendActivation(token: string): Observable<any> {
    return this.http.post(`${this.api.urls.resendActivationEmail}`, { token });
  }


  ngOnDestroy(){
      this.subs.forEach(sub => sub.unsubscribe())
  }
}
