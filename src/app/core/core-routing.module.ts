import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Containers
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { LoginComponent } from "../auth/containers/login/login.component";
import { SignupComponent } from "../auth/containers/signup/signup.component";
import { NotFoundPageComponent } from "./containers/not-found-page/not-found-page.component";
import { ChechAuthService } from "../auth/guards/chech-auth.service";
import { LoginFormComponent } from "../auth/components/login-form/login-form.component";
import { SignupFormComponent } from "../auth/components/signup-form/signup-form.component";

const COMPONENTS = [];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild([])],
  exports: [...COMPONENTS, RouterModule]
})
export class CoreRoutingModule {}
