import { NgModule } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

// Containers
import { AppShellComponent } from "./containers/app-shell/app-shell.component";

// Guards
import { ChechAuthGuard } from '../auth/guards/chech-auth.service';
import { MainPageComponent } from './containers/main-page/main-page.component';

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
        canActivate: [ChechAuthGuard]
      },
      {
        path: "contacts",
        loadChildren: "./../contacts/contacts.module#ContactsModule",
        canActivate: [ChechAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
