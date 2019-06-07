import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Modules
import { CoreRoutingModule } from "./core-routing.module";

// Containers
import { AppShellComponent } from "./containers/app-shell/app-shell.component";
import { MainPageComponent } from "./containers/main-page/main-page.component";

// Components
import { NavabarComponent } from "./components/navabar/navabar.component";

// Components

const COMPONENTS = [
  AppShellComponent,
  MainPageComponent,
  NavabarComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, CoreRoutingModule],
  exports: [...COMPONENTS, CoreRoutingModule]
})
export class CoreModule {}
