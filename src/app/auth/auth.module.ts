import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AppState } from './../ngrx-store/reducers/index';
import * as fromAuth from '../auth/actions/auth.actions';

// Modules
import { AuthRoutingModule } from './auth-routing.module';

// Containers
import { LoginComponent } from './containers/login/login.component'
import { SignupComponent } from './containers/signup/signup.component';


// NgRx
import { reducer } from './reducers/auth.reducer';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [LoginComponent, SignupComponent]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])    
  ],
  exports: [...COMPONENTS, AuthRoutingModule]
})
export class AuthModule {
  constructor(private store: Store<AppState>) {
    store.dispatch(new fromAuth.CheckAuth());
  }
}
