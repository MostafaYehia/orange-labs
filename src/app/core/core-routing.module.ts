import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Containers
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { LoginComponent } from '../auth/containers/login/login.component';
import { SignupComponent } from '../auth/containers/signup/signup.component';
import { NotFoundPageComponent } from "./containers/not-found-page/not-found-page.component";

/**
 * Add all routes to app-shell component to provide flexibilty for routes
 * with full screen design ( Which doesn't implement reusable
 * navbar like 'login,signup, landing')
 */
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "landing" },
  { path: "landing", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "main", loadChildren: "./core.module#CoreModule" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
