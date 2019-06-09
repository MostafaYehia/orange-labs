import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../ngrx-store/reducers";
import { Router } from "@angular/router";
import { isLoggedInState } from "../../selectors";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    // this.subs
    this.subs.push(
      this.store.select(isLoggedInState).subscribe(loggedIn => {
        if (loggedIn) {
          this.router.navigate(["/contacts"]);
        }
      })
    );
  }



  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
