import { Injectable, OnDestroy } from "@angular/core";
import { AppState } from "src/app/ngrx-store/reducers";
import { Store } from "@ngrx/store";
import { tokenState } from "../../auth/selectors";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService implements OnDestroy {
  baseUrl = "http://localhost:3000";
  token: string | null = null;
  subs: Subscription[] = [];

  urls = {
    login: `${this.baseUrl}/auth/login`,
    signup: `${this.baseUrl}/auth/signup`,
    checkAuth: `${this.baseUrl}/auth/check`,

    contacts: `${this.baseUrl}/api/contacts`
  };

  constructor(private store: Store<AppState>) {
    this.subs.push(
      this.store.select(tokenState).subscribe(token => (this.token = token))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
