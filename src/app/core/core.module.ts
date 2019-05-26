import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Containers
import { AppComponent } from './app.component';
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';

// Components
import { NavabarComponent } from './components/navabar/navabar.component';
import { SlideShowComponent, SlideShowItemComponent } from './components/slide-show/slide-show.component';

// Components

const COMPONENTS = [
    AppComponent,
    AppShellComponent,
    MainPageComponent,
    LandingPageComponent,
    NotFoundPageComponent,
    SlideShowComponent,
    SlideShowItemComponent,
    NavabarComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [...COMPONENTS, AppRoutingModule]
})
export class CoreModule { }
