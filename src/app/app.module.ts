import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "../environments/environment";

// Modules
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";

// NgRx Modules ( State management )
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./ngrx-store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { CustomSerializer } from "./ngrx-store/custom-route-serializer";

// Containers
import { AppComponent } from "./core/app.component";
import { LandingPageComponent } from "./core/containers/landing-page/landing-page.component";

// Components
import { SlideShowComponent } from "./core/components/slide-show/slide-show.component";
import { SlideShowItemComponent } from "./core/components/slide-show/slide-show-item.component";

// Directives
import { SlideBlueprintDirective } from './core/components/slide-show/slide-blueprint.directive';

const COMPONENTS = [
  AppComponent,
  LandingPageComponent,
  SlideShowComponent,
  SlideShowItemComponent,
  SlideBlueprintDirective
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    // Auth Module
    AuthModule,
    // App Routing Module
    AppRoutingModule,
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
