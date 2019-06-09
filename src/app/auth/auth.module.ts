import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./effects/auth.effects";
import { AppState } from "./../ngrx-store/reducers/index";
import * as fromAuth from "../auth/actions/auth.actions";

// Modules
import { AuthRoutingModule } from "./auth-routing.module";

// NgRx
import { reducer } from "./reducers/auth.reducer";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

// Containers
import { LoginComponent } from "./containers/login/login.component";
import { SignupComponent } from "./containers/signup/signup.component";

// Components
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";
import { SharedModule } from '../shared/shared.module';
import { AuthorizationInterceptorService } from './interceptors/authorization-interceptor.service';

const COMPONENTS = [
  LoginComponent,
  SignupComponent,
  LoginFormComponent,
  SignupFormComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature("auth", reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [...COMPONENTS, AuthRoutingModule]
})
export class AuthModule {
  constructor(private store: Store<AppState>) {
    // store.dispatch(new fromAuth.CheckAuth());
  }
}
