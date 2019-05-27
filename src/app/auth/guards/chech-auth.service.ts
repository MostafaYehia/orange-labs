import { Injectable } from "@angular/core";
import { AuthApiService } from "../services/auth-api.service";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class ChechAuthService implements CanActivate {
  constructor(private authApi: AuthApiService) {}

  canActivate(): boolean {
    return this.authApi.currentUser == null;
  }
}
