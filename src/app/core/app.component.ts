import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/ngrx-store/reducers";
import { LoadUser } from "../auth/actions/auth.actions";
import { Observable } from "rxjs";
import { isVerifiedState } from "../auth/selectors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Orange-labs";
  isVerified$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Get account verification state
    this.isVerified$ = this.store.select(isVerifiedState);
    // Load user data from local storage
    this.store.dispatch(new LoadUser());
  }
}
