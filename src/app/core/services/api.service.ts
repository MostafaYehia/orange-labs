import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl = "http://localhost:3000";
  token: string | null = null;
  subs: Subscription[] = [];

  urls = {
    login: `${this.baseUrl}/auth/login`,
    signup: `${this.baseUrl}/auth/signup`,
    resendActivationEmail: `${this.baseUrl}/auth/activation/resend`,
    checkAuth: `${this.baseUrl}/auth/check`,

    contacts: `${this.baseUrl}/api/contacts`
  };

  constructor() {
  }


}
