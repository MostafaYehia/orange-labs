import { RouterModule, Route } from "@angular/router";
import { NgModule } from "@angular/core";

// Pages
import { LoginComponent } from "./containers/login/login.component";
import { SignupComponent } from "./containers/signup/signup.component";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
