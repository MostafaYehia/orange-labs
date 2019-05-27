import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CoreRoutingModule } from './core-routing.module';

// Containers
import { AppComponent } from './app.component';
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';

// Components
import { NavabarComponent } from './components/navabar/navabar.component';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { SlideShowItemComponent } from './components/slide-show/slide-show-item.component';
import { LoginSignupComponent } from '../auth/components/login-signup/login-signup.component';

// Components

const COMPONENTS = [
    AppComponent,
    AppShellComponent,
    MainPageComponent,
    LandingPageComponent,
    NotFoundPageComponent,
    SlideShowComponent,
    SlideShowItemComponent,
    NavabarComponent,
    LoginSignupComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [...COMPONENTS]
})
export class CoreModule { }
