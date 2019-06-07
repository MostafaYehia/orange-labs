import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl = "http://localhost:3000";

  urls = {
    login: `${this.baseUrl}/auth/login`,
    signup: `${this.baseUrl}/auth/signup`
  };

  constructor() {}
}
