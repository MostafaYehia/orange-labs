import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../../core/services/api.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthApiService {
  currentUser = true;

  constructor(private http: HttpClient, private api: ApiService) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(this.api.urls.login, data);
  }

  signup(data: { email: string; password: string }): Observable<any> {
    return this.http.post(this.api.urls.signup, data);
  }
}
