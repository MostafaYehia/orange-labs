import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/ngrx-store/reducers";
import { Observable } from "rxjs";
import { isVerifiedState } from "../selectors";
import { map } from "rxjs/operators";
import { NgxNotificationService } from "ngx-notification";

@Injectable({
  providedIn: "root"
})
export class IsVerifiedGuard {
  constructor(
    private store: Store<AppState>,
    private ngxNotificationService: NgxNotificationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(isVerifiedState).pipe(
      map(verified => {
        console.log("is verified: ", verified)
        if (verified) {

          return true;
        } else {
          this.ngxNotificationService.sendMessage(
            "You need to verify your account to access!",
            "none",
            "bottom-right"
          );

          return false;
        }
      })
    );
  }
}
