import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./effects/auth.effects";
import { AppState } from "./../ngrx-store/reducers/index";
import * as fromAuth from "../auth/actions/auth.actions";

// Modules
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from '../shared/shared.module';

// Containers
import { LoginComponent } from "./containers/login/login.component";
import { SignupComponent } from "./containers/signup/signup.component";

import { SignupFormComponent } from './components/signup-form/signup-form.component';

// NgRx
import { reducer } from "./reducers/auth.reducer";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

const COMPONENTS = [LoginComponent, SignupComponent, SignupFormComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature("auth", reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [...COMPONENTS, AuthRoutingModule, ReactiveFormsModule]
})
export class AuthModule {
  constructor(private store: Store<AppState>) {
    store.dispatch(new fromAuth.CheckAuth());
  }
}
