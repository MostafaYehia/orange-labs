import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/ngrx-store/reducers";
import { LoadUser } from "../auth/actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Orange-labs";
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Load user data from local storage
    this.store.dispatch(new LoadUser());
  }
}
