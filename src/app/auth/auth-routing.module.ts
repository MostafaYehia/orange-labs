import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './containers/login/login.component';


const routes: Route[] = [{
  path: 'login',
  component: LoginComponent
}]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
