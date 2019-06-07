import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "../environments/environment";

// Modules
import { CoreModule } from "./core/core.module";

// NgRx Modules ( State management )
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./ngrx-store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { CustomSerializer } from "./ngrx-store/custom-route-serializer";

// Containers
import { AppComponent } from "./core/app.component";
import { AuthModule } from "./auth/auth.module";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./core/containers/landing-page/landing-page.component";
import { NotFoundPageComponent } from "./core/containers/not-found-page/not-found-page.component";

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
  declarations: [AppComponent, LandingPageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // Core Module
    CoreModule,
    // Auth Module
    AuthModule,
    // NgRx Store for state management
    StoreModule.forRoot(reducers, { metaReducers }),
    // NgRx Effects for async state update
    EffectsModule.forRoot([]),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    // Store Dev tools visual state tracking using Redux Devtools
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
