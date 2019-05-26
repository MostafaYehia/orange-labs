import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Containers
import { AppShellComponent } from "./containers/app-shell/app-shell.component";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { MainPageComponent } from "./containers/main-page/main-page.component";
import { NotFoundPageComponent } from "./containers/not-found-page/not-found-page.component";

/**
 * Add all routes to app-shell component to provide flexibilty for routes
 * with full screen design ( Which doesn't implement reusable
 * navbar like 'login,signup, landing')
 */
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "landing" },
  { path: "landing", component: LandingPageComponent },
  { path: "main", loadChildren: "./core.module#CoreModule" },
  { path: "**", component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
