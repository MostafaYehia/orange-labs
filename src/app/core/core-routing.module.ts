import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

// Containers
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { MainPageComponent } from "./containers/main-page/main-page.component";

const routes: Route[] = [
  {
    path: "",
    component: AppShellComponent,
    children: [
      {
        path: "",
        component: MainPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
