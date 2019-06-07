import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Containers
import { LandingPageComponent } from "./core/containers/landing-page/landing-page.component";
import { NotFoundPageComponent } from "./core/containers/not-found-page/not-found-page.component";

// Guards
import { ChechAuthService } from "./auth/guards/chech-auth.service";

/**
 * Add all routes to app-shell component to provide flexibilty for routes
 * with full screen design ( Which doesn't implement reusable
 * navbar like 'login,signup, landing')
 */
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "landing" },
  {
    path: "landing",
    component: LandingPageComponent
  },
  {
    path: "main",
    loadChildren: "./core/core.module#CoreModule",
    canActivate: [ChechAuthService]
  },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, NotFoundPageComponent]
})
export class AppRoutingModule {}
