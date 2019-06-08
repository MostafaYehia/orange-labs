import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "src/app/core/services/api.service";
import { AppState } from "../../ngrx-store/reducers";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { tokenState } from "../../auth/selectors";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactsApiService implements OnDestroy {
  baseContactsUrl;
  subs: Subscription[] = [];
  headers = {};

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private store: Store<AppState>
  ) {
    this.baseContactsUrl = this.api.urls.contacts;
    this.subs.push(
      this.store.select(tokenState).subscribe(token => {
        this.headers = {
          Authorization: `bearer ${token}`
        };
      })
    );
  }

  getContacts = (page, sortTybe) => {
    return this.http
      .get(`${this.baseContactsUrl}`, {
        headers: this.headers,
        params: {
          page: page || 1,
          sortBy: sortTybe || "firstName"
        }
      })
      .pipe(map((res: any) => res.contacts));
  };

  getSingleContact = id => {
    return this.http.get(`${this.baseContactsUrl}/${id}`, {
      headers: this.headers
    });
  };

  createContact = data => {
    return this.http.post(`${this.baseContactsUrl}`, data, {
      headers: this.headers
    });
  };

  editContact = (id, updatedData) => {
    return this.http.put(`${this.baseContactsUrl}/${id}`, updatedData, {
      headers: this.headers
    });
  };

  deleteContact = id => {
    return this.http.delete(`${this.baseContactsUrl}/${id}`, {
      headers: this.headers
    });
  };

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
