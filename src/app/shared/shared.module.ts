import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

// Components
import { NgxNotificationComponent } from 'ngx-notification';
import { NavabarComponent } from "../core/components/navabar/navabar.component";
import { LoadingIconComponent } from "./components/loading-icon/loading-icon.component";

// Components
const COMPONENTS = [
  NavabarComponent,
  LoadingIconComponent,
  NgxNotificationComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS]
})
export class SharedModule {}
