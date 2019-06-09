import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../ngrx-store/reducers";
import { Login, AuthLoading } from "../../actions/auth.actions";
import { Observable } from "rxjs";
import { authLoading, loginErrorState } from "../../selectors";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginSubmited = false;
  loginError$: Observable<null | string>;
  authLoading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    // Observe loading state
    this.loginError$ = this.store.select(loginErrorState);
    // Observe Error State
    this.authLoading$ = this.store.select(authLoading);

    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {}

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login() {
    this.loginSubmited = true;
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.store.dispatch(new AuthLoading());
      this.store.dispatch(new Login(data));
    }
  }
}
