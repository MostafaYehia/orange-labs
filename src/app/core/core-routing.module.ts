import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

// Containers
import { AppShellComponent } from "./containers/app-shell/app-shell.component";
import { MainPageComponent } from "./containers/main-page/main-page.component";

// Guards
import { ChechAuthService } from '../auth/guards/chech-auth.service';

const routes: Route[] = [
  {
    path: "",
    component: AppShellComponent,
    children: [
      {
        path: "",
        redirectTo: "main",
        pathMatch: "full"
      },
      {
        path: "main",
        component: MainPageComponent,
        canActivate: [ChechAuthService]
      },
      {
        path: "contacts",
        loadChildren: "./../contacts/contacts.module#ContactsModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
