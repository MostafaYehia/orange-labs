import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { LoginFormComponent } from '../auth/components/login-form/login-form.component';
import { SignupFormComponent } from '../auth/components/signup-form/signup-form.component';

// Directives
import { SlideBlueprintDirective } from './components/slide-show/slide-blueprint.directive';


// Components

const COMPONENTS = [
    AppComponent,
    AppShellComponent,
    MainPageComponent,
    LandingPageComponent,
    NotFoundPageComponent,
    SlideShowComponent,
    SlideShowItemComponent,
    SlideBlueprintDirective,
    NavabarComponent,
    LoginFormComponent,
    SignupFormComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule
  ],
  exports: [...COMPONENTS]
})
export class CoreModule { }
