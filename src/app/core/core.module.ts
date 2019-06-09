import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Modules
import { SharedModule } from "../shared/shared.module";
import { CoreRoutingModule } from "./core-routing.module";

// Containers
import { AppShellComponent } from "./containers/app-shell/app-shell.component";
import { MainPageComponent } from './containers/main-page/main-page.component';

// Components

const COMPONENTS = [
  AppShellComponent,
  MainPageComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, CoreRoutingModule],
  exports: [...COMPONENTS, CoreRoutingModule]
})
export class CoreModule {}
