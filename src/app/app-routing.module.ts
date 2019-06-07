import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Containers
import { LandingPageComponent } from "./core/containers/landing-page/landing-page.component";
import { NotFoundPageComponent } from "./core/containers/not-found-page/not-found-page.component";

// Guards
import { VerifyAccountPageComponent } from "./core/containers/verify-account-page/verify-account-page.component";

/**
 * Add all routes to app-shell component to provide flexibilty for routes
 * with full screen design ( Which doesn't implement reusable
 * navbar like 'login,signup, landing')
 */
const routes: Routes = [
  {
    path: "",
    loadChildren: "./core/core.module#CoreModule"
  },
  {
    path: "landing",
    component: LandingPageComponent
  },
  {
    path: "account/verify",
    component: VerifyAccountPageComponent
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, NotFoundPageComponent]
})
export class AppRoutingModule {}
